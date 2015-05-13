var Calendar = require('./models/calendar').
    Event = require('./models/event');

module.exports = {
  scrapeCalendars: function () {
    Calendar.scrape();
  },
  scrapeEvents: function () {
    Event.scrape();
  }
};