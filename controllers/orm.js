"use strict";

let API = require('json-api'),
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
    Video: require('../models/video')
  };
  
  let adapter = new API.dbAdapters.Mongoose(models),
      registry = new API.ResourceTypeRegistry(),
      controller = new API.controllers.API(registry),
      expressStrategy = new API.httpStrategies.Express(controller);
      
  let resourceTypes = [
    'bulletins',
    'features',
    'witnesses',
    'calendars',
    'events',
    'notifications',
    'video-albums',
    'videos'
  ];
  
  resourceTypes.forEach(t => {
    registry.type(t, {
      dbAdapter: adapter,
      urlTemplates: {
        self: `${routeBase}/${t}/{id}`
      }
    });
  });
  
  function generateRoutePatterns (resourceTypes) {
    let multi = '/:type(' + resourceTypes.join('|') + ')',
        single = multi + '/:id',
        links = single + '/links/:relationship';
        
    return {
      multi: multi,
      single: single,
      links: links
    };
  }
  
  let requestHandler = expressStrategy.apiRequest.bind(expressStrategy),
      patterns = generateRoutePatterns(resourceTypes),
      authRequestHandler = (req, res) => {
        if (Authentication.isAuthenticatedRequest(req)) {
          requestHandler(req, res);
        } else {
          res.status(401).end();
        }
      },
      deleteHandler = (req, res) => {
        // Bit of a hack to make sure this isn't a problem:
        // https://github.com/emberjs/data/issues/3010
        delete req.headers['content-length'];
        authRequestHandler(req, res);
      };
  
  let route = { };
  route[patterns.multi] = {
    get: requestHandler,
    post: authRequestHandler
  };
  route[patterns.single] = {
    get: requestHandler,
    patch: authRequestHandler,
    delete: deleteHandler
  };
  route[patterns.links] = {
    get: requestHandler,
    patch: authRequestHandler,
    delete: deleteHandler
  };
  
  
  for (let pattern in route) {
    let r = router.route(pattern);
    for (let method in route[pattern]) {
      r[method](route[pattern][method]);
      // E.g. route.get(requestHandler);
    }
  }
};
