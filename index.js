require('dotenv').load();

if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

var express = require('express'),
    later = require('later'),
    Worker = require('./worker'),
    app = express(),
    port = process.env.NODE_ENV === 'development' ? 8080 : (process.env.PORT || 8001);

var dbReady = require('./config')(app);
require('./static')(app);
require('./api')(app);

var calendarsSchedule = later.parse.text('every 30 minutes');
later.setInterval(Worker.scrapeCalendars, calendarsSchedule);
later.setInterval(Worker.scrapeEvents, calendarsSchedule);
Worker.scrapeCalendars();
Worker.scrapeEvents();

var serverReady = new Promise(function (resolve, reject) {
  var server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;

    console.log('Server listening on port ' + port);
    resolve(server);
  });
});

module.exports = Promise.all([dbReady, serverReady]);