var express = require('express'),
	orm = require('orm'),
	request = require('request'),
	inflectorController = require('./server/controllers/inflector'),
	NODE_ENV = process.env.NODE_ENV,
	currentToken;

module.exports = function (server) {

	var dbUrl = process.env.DATABASE_URL + '?ssl=true';
	if (NODE_ENV === 'development') {
		// dbUrl = process.env.LOCAL_PG_URL;
	}

	server.use(orm.express(dbUrl, {
		define: function (db, models, next) {
			// Load your models here
			// models.todo = require('./server/models/todo')(db);
			models.bulletin = require('./server/models/bulletin')(db);

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
