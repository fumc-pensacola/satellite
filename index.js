var NODE_ENV = process.env.NODE_ENV,
	express = require('express'),
	server = express();

server.configure(function() {
	server.use(express.json());
	server.use(express.urlencoded());
});

require('./app')(server);
require('./server')(server);

console.log(NODE_ENV);
if (NODE_ENV === 'production') {
	server.listen(process.env.PORT || 8001);
} else {
	// Export server in dev to work with grunt-express
	module.exports = server;
}
