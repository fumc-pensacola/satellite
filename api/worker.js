var Calendar = require('./models/calendar');

module.exports = {
  scrapeCalendars: function () {
    Calendar.scrape();
  }
};