var express = require('express'),
	orm = require('orm'),
	request = require('request'),
	AWS = require('aws-sdk'),
	moment = require('moment'),
	ical = require('ical-generator'),
	inflectorController = require('./server/controllers/inflector'),
	ACSController = require('./server/controllers/acs'),
	NODE_ENV = process.env.NODE_ENV,
	currentToken,
	calendar;

module.exports = function (server) {

	var dbUrl = process.env.DATABASE_URL + '?ssl=true';
	if (NODE_ENV === 'development') {
		// dbUrl = process.env.LOCAL_PG_URL;
	}

	AWS.config.loadFromPath('./aws.json');
	var s3 = new AWS.S3({ params: { Bucket: 'fumcappfiles' } });

	server.use(orm.express(dbUrl, {
		define: function (db, models, next) {
			// Load your models here
			// models.todo = require('./server/models/todo')(db);
			models.bulletin = require('./server/models/bulletin')(db);
			models.witness = require('./server/models/witness')(db);

			db.settings.set('instance.returnAllErrors', true);
			// db.drop();
			db.sync();

			next();
		}
	}));

	function validTokenProvided (req, res) {
		var userToken = req.body.token || req.param('token') || req.headers.token;
		return userToken === currentToken;
	}

	server.get('/api/v1', function (req, res) {
		res.send('API v1');
	});

	var acsController = new ACSController();
	acsController.setup();

	server.get('/api/calendars/:id', function (req, res) {
		acsController.sharedInstance().then(function (acs) {
			console.log('Getting events...');
			return acs.getCalendarEvents(req.params.id, moment().subtract(1, 'years'), moment().add(1, 'years'));
		}).then(function (events) {
			console.log('Got events!');
			var calendar = ical();
			calendar.setDomain('fumc.herokuapp.com');

			for (var i = 0; i < events.length; i++) {
				calendar.addEvent({
					start: events[i].from,
					end: events[i].to,
					summary: events[i].name,
					description: events[i].description
				});
			}
			console.log('Serving events...');
			calendar.serve(res);
		});
	});

	server.get('/api/file/:key', function (req, res) {
		s3.getSignedUrl('getObject', { Key: req.params.key }, function (err, url) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				console.log(url);
				res.redirect(303, url);
			}
		});
	});

	server.post('/api/:modelName', function (req, res) {
		if (validTokenProvided(req, res)) {
			inflectorController.post(req, res);
		} else {
			res.status(401).send('Invalid token');
		}
	});

	server.get('/api/:modelName', function (req, res) {
		inflectorController.findMany(req, res);
	});

	server.get('/api/:modelName/:id', function (req, res) {
		inflectorController.findOne(req, res);
	});

	server.put('/api/:modelName/:id', function (req, res) {
		if (validTokenProvided(req, res)) {
			inflectorController.put(req, res);
		} else {
			res.status(401).send('Invalid token');
		}
	});

	server.delete('/api/:modelName/:id', function (req, res) {
		if (validTokenProvided(req, res)) {
			inflectorController.delete(req, res);
		} else {
			res.status(401).send('Invalid token');
		}
	});

	server.post('/authenticate', function (req, res) {
		request({
			url: 'https://api.amazon.com/auth/o2/tokeninfo',
			qs: { 'access_token': req.body.access_token }
		}, function (err, response, body) {
			if (err) {
				console.log(err);
				res.status(500).send('Error reaching Amazon authenticator');
				return;
			}

			var data = JSON.parse(body),
					users = [
						'amzn1.account.AFC2TKGPU7KRSE4SEKWMGEV56PSA', // Drew
						'amzn1.account.AGWSVRRT7XXKLFRXVK3VRD4ZFQFA', // Jeb
						'amzn1.account.AGNCNKDH6G3BYYXF7JP4WJHEFJDQ'  // Kyle
					];

			if (data.aud !== 'amzn1.application-oa2-client.cfecafe9a3474592888a2823741d07d5') {
				res.status(401).send('Invalid token');
				return;
			}

			console.log(data.user_id);

			if (!~users.indexOf(data.user_id)) {
				res.status(401).send('User not whitelisted');
				return;
			}

			currentToken = req.body.access_token;
			request({
				url: 'https://api.amazon.com/user/profile',
				headers: { 'Authorization': 'bearer ' + req.body.access_token }
			}, function (err, response, body) {
				var data = JSON.parse(body);
				res.send({
					success: true,
					token: req.body.access_token,
					name: data.name,
					email: data.email
				});
			});

		});
	});
};
