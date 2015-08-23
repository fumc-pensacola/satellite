"use strict";

try { require('dotenv').load(); } catch (e) {}

if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

let express = require('express'),
    later = require('later'),
    Worker = require('./worker'),
    app = express(),
    port = process.env.PORT;

function startApp() {
  let dbReady = require('./config')(app);
  require('./static')(app);
  require('./api')(app);

  if (process.env.NODE_ENV !== 'test') {
    let calendarsSchedule = later.parse.text('every 30 minutes');
    later.setInterval(Worker.scrapeCalendars, calendarsSchedule);
    later.setInterval(Worker.scrapeEvents, calendarsSchedule);
    Worker.scrapeCalendars();
    Worker.scrapeEvents();
  }

  let serverReady = new Promise((resolve, reject) => {
    let server = app.listen(port, function() {
      let host = server.address().address,
          port = server.address().port;

      console.log('Server listening on port ' + port);
      resolve(server);
    });
  });
  
  return Promise.all([dbReady, serverReady]);
}

if (process.env.NODE_ENV === 'test') {
  module.exports = startApp;
} else {
  module.exports = startApp();
}
