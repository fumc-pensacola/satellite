var Calendar = require('./models/calendar'),
    Event = require('./models/event'),
    moment = require('moment');

module.exports = {
  scrapeCalendars: function () {
    Calendar.scrape();
  },
  scrapeEvents: function () {
    Event.scrape(moment().subtract(1, 'weeks'), moment().add(2, 'weeks'));
  }
};