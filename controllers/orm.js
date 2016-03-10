"use strict";

let API = require('json-api'),
    forOwn = require('lodash/forOwn'),
    jwt = require('express-jwt'),
    scopes = require('../utils/scopes'),
    clientAuthMiddleware = require('../utils/client-auth-middleware'),
    Authentication = require('../authentication');

module.exports = function(router, routeBase) {

  let models = {
    Bulletin: require('../models/bulletin'),
    Calendar: require('../models/calendar'),
    Event: require('../models/event'),
    Feature: require('../models/feature'),
    Notification: require('../models/notification'),
    Setting: require('../models/setting'),
    Witness: require('../models/witness'),
    VideoAlbum: require('../models/video-album'),
    Video: require('../models/video'),
    Family: require('../models/family'),
    Member: require('../models/member')
  };
  
  let adapter = new API.dbAdapters.Mongoose(models),
      registry = new API.ResourceTypeRegistry(),
      controller = new API.controllers.API(registry),
      expressStrategy = new API.httpStrategies.Express(controller),
      requestHandler = expressStrategy.apiRequest.bind(expressStrategy);
      
  let resourceTypes = {
    'bulletins': { type: 'bulletins' },
    'features': { type: 'features' },
    'witnesses': { type: 'witnesses' },
    'calendars': { type: 'calendars' },
    'events': { type: 'events' },
    'notifications': { type: 'notifications' },
    'video-albums': { type: 'video-albums' },
    'videos': { type: 'videos' },
    'directory/members': { type: 'members', protected: true, requiredScopes: { GET: scopes.directory.fullReadAccess } },
    'directory/families': { type: 'families', protected: true, requiredScopes: { GET: scopes.directory.fullReadAccess } }
  };
  
  forOwn(resourceTypes, (t, url) => {
    registry.type(t.type, {
      dbAdapter: adapter,
      parentType: t.parentType,
      urlTemplates: {
        self: `${routeBase}/${url}/{id}`,
        relationship: `${routeBase}/${url}/{ownerId}/relationships/{path}`
      }
    });
  });
  
  let multi = `/:type(${Object.keys(resourceTypes).join('|')})`,
      single = `${multi}/:id`,
      links = `${single}/links/:relationship`;
  
  const adminAuthMiddleware = (req, res, next) => {
    if (!Authentication.isAuthenticatedRequest(req)) {
      return res.status(401).end();
    }
    
    next();
  };
  
  const deleteFixer = (req, res, next) => {
    // Bit of a hack to make sure this isn't a problem:
    // https://github.com/emberjs/data/issues/3010
    delete req.headers['content-length'];
    next();
  };
  
  const resourceOptionsMapper = (req, res, next) => {
    Object.assign(req, resourceTypes[req.params.type]);
    req.params.type = req.type;
    next();
  };
  
  const conditionalJWT = (req, res, next) => {
    if (req.protected) return jwt({ secret: process.env.JWT_SECRET })(req, res, next);
    next();
  };
  
  router.route(multi)
    .get([resourceOptionsMapper, conditionalJWT, clientAuthMiddleware], requestHandler)
    .post([resourceOptionsMapper, adminAuthMiddleware], requestHandler);
  router.route(single)
    .get([resourceOptionsMapper, conditionalJWT], requestHandler)
    .patch([resourceOptionsMapper, adminAuthMiddleware], requestHandler)
    .delete([resourceOptionsMapper, deleteFixer, adminAuthMiddleware], requestHandler);
  router.route(links)
    .get([resourceOptionsMapper, conditionalJWT, clientAuthMiddleware], requestHandler)
    .patch([resourceOptionsMapper, adminAuthMiddleware], requestHandler)
    .delete([resourceOptionsMapper, deleteFixer, adminAuthMiddleware], requestHandler);
    
  router.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).end();
    }
  });
};
