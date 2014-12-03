var express = require('express'),
	orm = require('orm'),
	request = require('request'),
	AWS = require('aws-sdk'),
	moment = require('moment'),
	ical = require('icalendar'),
	sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY),
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
			models.setting = require('./server/models/setting')(db);
			models.feature = require('./server/models/feature')(db);
			models.notification = require('./server/models/notification')(db);

			models.notification.hasOne('feature', models.feature);

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

	server.get('/api/calendars/:id.:format', function (req, res) {
		acsController.sharedInstance().then(function (acs) {
			console.log('Getting events...');
			var from = req.query.from ? new Date(req.query.from) : moment().subtract(1, 'years'),
					to = req.query.to ? new Date(req.query.to) : moment().add(1, 'years');
			return acs.getCalendarEvents(req.params.id, from, to);
		}).then(function (events) {
			console.log('Got events!');

			if ((req.params.format || '').toLowerCase() === 'json') {
				res.send(events.sort(function (a, b) {
					return b.from - a.from;
				}));
			} else {
				var calendar = new ical.iCalendar();
				for (var i = 0; i < events.length; i++) {
					var e = new ical.VEvent(calendar, events[i].id + i);
					e.setDate(events[i].from, events[i].to);
					e.setSummary(events[i].name);
					e.setDescription(events[i].description);
					events[i].location && e.setLocation(events[i].location.name);
					calendar.addComponent(e);
				}
				res.setHeader('Content-disposition', 'attachment; filename=' + req.params.id + '.ics');
				res.setHeader('Content-type', 'text/calendar');
				res.send(calendar.toString());
			}
		});
	});

	server.post('/api/emailer/send', function (req, res) {
		req.models.setting.find().run(function(err, models) {
			if (err) {
				res.status(500).send(err.toString());
			} else {
				sendgrid.send({
					to: models.filter(function (s) { return s.key === 'prayer_request_email'; })[0].value,
					from: 'app@fumcpensacola.com',
					subject: 'New prayer request submission',
					text: 'A user of the FUMC app just submitted a prayer request:\r\n\r\n' + req.body.email
				}, function (err, json) {
					if (err) {
						console.error(err);
						res.status(500).json(err);
					} else {
						res.json(json);
					}
				});
			}
		});
	});

	server.post('/api/notify/everyone', function (req, res) {
		if (validTokenProvided(req, res)) {
			var notification = req.body.notification;
			request.post({
				url: 'https://api.zeropush.com/broadcast',
				form: {
					auth_token: process.env.ZEROPUSH_DEV_TOKEN,
					alert: notification.message,
					expiry: Math.floor(new Date(notification.expirationDate).getTime() / 1000),
					badge: '+1',
					info: JSON.stringify({
						id: notification.id,
						url: notification.url,
						sendDate: moment.tz(notification.sendDate, 'US/Central').format()
					})
				}
			}, function (error, response, body) {
				if (error) {
					res.status(500).json(error);
				} else {
					res.json(body);
				}
			});
		} else {
			res.status(401).send('Invalid token');
		}
	});

	server.get('/api/url/test', function (req, res) {
		request({
			url: req.query.url,
			method: 'HEAD'
		}, function (error, response, body) {
			if (error) {
				res.json({ found: false });
			} else {
				res.json({ found: true });
			}
		});
	});

	server.get('/api/notifications/current', function (req, res) {
		req.models.notification.find().where('"expirationDate" >= current_date').order('sendDate', 'Z').run(function(err, models) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			} else {
				res.json(models);
			}
		});
	});

	server.get('/api/file/:key', function (req, res) {
		s3.getSignedUrl('getObject', { Key: req.params.key }, function (err, url) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			} else {
				res.redirect(303, url);
			}
		});
	});

	server.post('/api/:modelName', function (req, res) {
		if (validTokenProvided(req, res)) {
			console.log(req.body);
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
