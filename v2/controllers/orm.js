"use strict";

// Only one babel/polyfill can be loaded at a time,
// so we’ll let the real json-api package load it.
require('fs').writeFileSync(require('path').resolve(__dirname, '../../node_modules/json-api-rc3/node_modules/babel/polyfill.js'), '');

let API = require('json-api-rc3'),
    Authentication = require('../../authentication');

module.exports = function(router, routeBase) {

  let models = {
    Bulletin: require('../../models/bulletin'),
    Calendar: require('../../models/calendar'),
    Event: require('../../models/event'),
    Feature: require('../../models/feature'),
    Notification: require('../../models/notification'),
    Setting: require('../../models/setting'),
    Witness: require('../../models/witness')
  };
  
  let adapter = new API.adapters.Mongoose(models),
      registry = new API.ResourceTypeRegistry(),
      controller = new API.controllers.API(registry);
      
  let resourceTypes = [
    'bulletins',
    'features',
    'witnesses',
    'calendars',
    'events',
    'notifications'
  ];
  
  resourceTypes.forEach(t => {
    registry.type(t, {
      adapter: adapter,
      urlTemplates: {
        self: routeBase + '/' + t + '/{id}'
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
  
  let front = new API.controllers.Front(controller),
      requestHandler = front.apiRequest.bind(front),
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
