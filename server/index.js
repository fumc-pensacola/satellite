require('./newrelic');

var NODE_ENV = process.env.NODE_ENV,
  express = require('express'),
  server = express();

require('./static')(server);
require('./api')(server);

if (NODE_ENV === 'production') {
  server.listen(process.env.PORT || 8001);
} else {
  // Export server in dev to work with grunt-express
  module.exports = server;
}
