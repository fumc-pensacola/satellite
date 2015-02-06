require('newrelic');

var express = require('express'),
    app = express();

require('./config')(app);
require('./static')(app);
require('./api')(app);

var server = app.listen(process.env.PORT || 8001, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
