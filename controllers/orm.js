var API = require('json-api'),
    Authentication = require('../authentication');

module.exports = function(router, routeBase) {

  var models = {
    Bulletin: require('../models/bulletin'),
    Calendar: require('../models/calendar'),
    Event: require('../models/event'),
    Feature: require('../models/feature'),
    Notification: require('../models/notification'),
    Setting: require('../models/setting'),
    Witness: require('../models/witness')
  };
  
  var adapter = new API.adapters.Mongoose(models),
      registry = new API.ResourceTypeRegistry(),
      controller = new API.controllers.API(registry);
      
  var resourceTypes = [
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
    var multi = '/:type(' + resourceTypes.join('|') + ')',
        single = multi + '/:id',
        links = single + '/links/:relationship';
        
    return {
      multi: multi,
      single: single,
      links: links
    };
  }
  
  var front = new API.controllers.Front(controller),
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
  
  var route = { };
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
  
  
  for (var pattern in route) {
    var r = router.route(pattern);
    for (var method in route[pattern]) {
      r[method](route[pattern][method]);
      // E.g. route.get(requestHandler);
    }
  }
};
