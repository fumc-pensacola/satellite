var mongoose = require('mongoose'),
    API = require('json-api'),
    Authentication = require('../authentication'),
    MONGOLAB_URI = process.env.MONGOLAB_URI;

module.exports = function (server) {
  
  mongoose.connect(MONGOLAB_URI);

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
      
  var resourceTypes = [
    'bulletins',
    'calendars',
    'features',
    'notifications',
    'settings',
    'witnesses'
  ];
  
  resourceTypes.forEach(function (t) {
    registry.type(t, {
      adapter: adapter,
      urlTemplates: {
        self: '/api/' + t + '/{id}'
      }
    });
  });
  
  var front = new API.controllers.Front(controller),
      requestHandler = front.apiRequest.bind(front),
      multiRoutePattern = '/api/:type(' + resourceTypes.join('|') + ')';
      singleRoutePattern = multiRoutePattern + '/:id';
  
  server.route(multiRoutePattern)
    .get(requestHandler)
    .post(requestHandler);
  server.route(singleRoutePattern)
    .get(requestHandler)
    .patch(requestHandler)
    .delete(requestHandler);

};
