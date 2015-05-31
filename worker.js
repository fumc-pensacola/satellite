var Calendar = require('./models/calendar'),
    Event = require('./models/event'),
    moment = require('moment');

module.exports = {
  scrapeCalendars: function () {
    Calendar.scrape().catch(function (err) {
      console.error(err);
    });
  },
  scrapeEvents: function (start, end) {
    start = start || moment().subtract(1, 'weeks');
    end = end || moment().add(2, 'weeks');
    Event.scrape(start, end).catch(function (err) {
      console.error(err);
    });
  }
};