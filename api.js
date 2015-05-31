"use strict";

let express = require('express'),
    ACS = require('./v1/acs'),
    authenticationController = require('./controllers/authentication'),
    calendarsController = require('./v1/controllers/calendars'),
    emailerController = require('./controllers/emailer'),
    fileController = require('./controllers/file'),
    notificationsController = require('./controllers/notifications'),
    notificationsControllerV1 = require('./v1/controllers/notifications'),
    ormController = require('./controllers/orm'),
    ormControllerV1 = require('./v1/controllers/orm'),
    ormControllerV2 = require('./v2/controllers/orm');
    

module.exports = function(server) {

  let v1 = express.Router(),
      v2 = express.Router(),
      v3 = express.Router();
  
  // Shared controllers
  [v1, v2, v3].forEach(v => {
    authenticationController(v);
    emailerController(v);
    fileController(v);
  });
  
  let routeBase = {
    v1: '(/api)?(/v1)?',
    v2: '(/api)?/v2',
    v3: '/v3'
  };
  
  // Version-specific controllers
  ormControllerV1(v1);
  ormControllerV2(v2, routeBase.v2);
  ormController(v3, routeBase.v3);
  notificationsControllerV1(v1);
  notificationsController(v2);
  calendarsController(v1, new ACS());

  server.use(routeBase.v1, v1);
  server.use(routeBase.v2, v2);
  server.use(routeBase.v3, v3)
};
