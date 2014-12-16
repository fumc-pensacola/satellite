require('newrelic');

var NODE_ENV = process.env.NODE_ENV,
	express = require('express'),
	server = express();

var forceSSL = function (req, res, next) {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	return next();
};

server.configure(function() {
	server.use(express.json());
	server.use(express.urlencoded());
	if (NODE_ENV === 'production') {
		server.use(forceSSL);
	}
});

require('./app')(server);
require('./server')(server);

if (NODE_ENV === 'production') {
	server.listen(process.env.PORT || 8001);
} else {
	// Export server in dev to work with grunt-express
	module.exports = server;
}
