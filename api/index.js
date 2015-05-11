require('newrelic');

var express = require('express'),
    later = require('later'),
    Worker = require('./worker'),
    app = express(),
    port = process.env.NODE_ENV === 'development' ? 8080 : (process.env.PORT || 8001);

require('./config')(app);
require('./static')(app);
require('./api')(app);

var calendarsSchedule = later.parse.text('every 30 minutes');
later.setInterval(Worker.scrapeCalendars, calendarsSchedule);
Worker.scrapeCalendars();

var server = app.listen(port, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
