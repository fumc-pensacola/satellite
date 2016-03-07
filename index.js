"use strict";

// Only one babel/polyfill can be loaded at a time,
// so we’ll wipe these out and load it ourselves.
require('fs').writeFileSync(require('path').resolve(__dirname, './node_modules/json-api-rc3/node_modules/babel/polyfill.js'), '');
require('fs').writeFileSync(require('path').resolve(__dirname, './node_modules/json-api/node_modules/babel/polyfill.js'), '');
require('babel-polyfill');

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
    later.setInterval(Worker.scrapeVideos, calendarsSchedule);
    Worker.scrapeCalendars();
    Worker.scrapeEvents();
    Worker.scrapeVideos();
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
