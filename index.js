"use strict";
require('babel-polyfill');

// Make mongoose use native Promises
let mongoose = require('mongoose');
mongoose.Promise = Promise;

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
    let directorySchedule = later.parse.recur().on(0).hour(); // Every night at midnight
    later.setInterval(Worker.scrapeCalendars, calendarsSchedule);
    later.setInterval(Worker.scrapeEvents, calendarsSchedule);
    later.setInterval(Worker.scrapeVideos, calendarsSchedule);
    later.setInterval(Worker.scrapeMembers, directorySchedule);
  }

  let serverReady = new Promise((resolve, reject) => {
    let server = app.listen(port, function() {
      let port = server.address().port;
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
