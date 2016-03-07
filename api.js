"use strict";

let express = require('express'),
    morgan = require('morgan'),
    authenticationController = require('./controllers/authentication'),
    icalController = require('./controllers/ical'),
    emailerController = require('./controllers/emailer'),
    fileController = require('./controllers/file'),
    notificationsController = require('./controllers/notifications'),
    ormController = require('./controllers/orm'),
    ormControllerV2 = require('./v2/controllers/orm');
    

module.exports = function(server) {
  
  server.use(morgan('combined'));
  let v2 = express.Router(),
      v3 = express.Router();
  
  // Shared controllers
  [v2, v3].forEach(v => {
    authenticationController(v);
    emailerController(v);
    fileController(v);
  });
  
  let routeBase = {
    v2: '(/api)?/v2',
    v3: '/v3'
  };
  
  // Version-specific controllers
  ormControllerV2(v2, routeBase.v2);
  ormController(v3, routeBase.v3);
  icalController(v3);
  notificationsController(v2);

  server.use(routeBase.v2, v2);
  server.use(routeBase.v3, v3)
};
