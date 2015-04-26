var API = require('json-api'),
    Authentication = require('../authentication');

module.exports = function (router, routeBase) {

  var models = {
    Bulletin: require('../models/bulletin'),
    Calendar: require('../models/calendar'),
    Feature: require('../models/feature'),
    Notification: require('../models/notification'),
    Setting: require('../models/setting'),
    Witness: require('../models/witness')
  };
  
  var adapter = new API.adapters.Mongoose(models),
      registry = new API.ResourceTypeRegistry(),
      controller = new API.controllers.API(registry);
      
  var publicResourceTypes = [
    'bulletins',
    'features',
    'witnesses'
  ];
  
  var privateResourceTypes = [
    'notifications'
  ];
  
  publicResourceTypes.concat(privateResourceTypes).forEach(function (t) {
    registry.type(t, {
      adapter: adapter,
      urlTemplates: {
        self: routeBase + '/' + t + '/{id}'
      }
    });
  });
  
  function generateRoutePatterns (resourceTypes, _private) {
    var multi = '/:type(' + resourceTypes.join('|') + ')',
        single = multi + '/:id',
        links = single + '/links/:relationship';
        
    return {
      private: _private,
      multi: multi,
      single: single,
      links: links
    };
  }
  
  var front = new API.controllers.Front(controller),
      requestHandler = front.apiRequest.bind(front),
      publicRoutePatterns = generateRoutePatterns(publicResourceTypes, false),
      privateRoutePatterns = generateRoutePatterns(privateResourceTypes, true),
      routes = [],
      authRequestHandler = function (req, res) {
        if (Authentication.isAuthenticatedRequest(req)) {
          requestHandler(req, res);
        } else {
          res.status(401).end();
        }
      },
      deleteHandler = function (req, res) {
        // Bit of a hack to make sure this isn't a problem:
        // https://github.com/emberjs/data/issues/3010
        delete req.headers['content-length'];
        authRequestHandler(req, res);
      };
  
  [publicRoutePatterns, privateRoutePatterns].forEach(function (p) {
    var route = { };
    route[p.multi] = {
      get: p.private ? authRequestHandler : requestHandler,
      post: authRequestHandler
    };
    route[p.single] = {
      get: p.private ? authRequestHandler : requestHandler,
      patch: authRequestHandler,
      delete: deleteHandler
    };
    route[p.links] = {
      get: p.private ? authRequestHandler : requestHandler,
      patch: authRequestHandler,
      delete: deleteHandler
    };
    routes.push(route);
  });
  
  
  routes.forEach(function (r) {
    for (var pattern in r) {
      var route = router.route(pattern);
      for (var method in r[pattern]) {
        route[method](r[pattern][method]);
        // E.g. route.get(requestHandler);
      }
    }
  });
};
