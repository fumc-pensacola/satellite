var express = require('express'),
		ACS = require('./acs'),
		authenticationController = require('./controllers/authentication'),
		calendarsController = require('./controllers/calendars'),
		emailerController = require('./controllers/emailer'),
		fileController = require('./controllers/file'),
		notificationsController = require('./controllers/notifications'),
		notificationsControllerV1 = require('./v1/controllers/notifications'),
		ormController = require('./controllers/orm'),
		ormControllerV1 = require('./v1/controllers/orm');
		

module.exports = function (server) {

	var v1 = express.Router(),
			v2 = express.Router(),
			acs = new ACS();
	
	// Shared controllers
	[v1, v2].forEach(function (v) {
		authenticationController(v);
		calendarsController(v, acs);
		emailerController(v);
		fileController(v);
	});
	
	// Version-specific controllers
	var routeBase = '(/api)?/v2';
	ormControllerV1(v1);
	ormController(v2, routeBase);
	notificationsControllerV1(v1);
	notificationsController(v2);

	server.use('(/api)?(/v1)?', v1);
	server.use(routeBase, v2);
};
