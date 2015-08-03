"use strict";

let Calendar = require('./models/calendar'),
    Event = require('./models/event'),
    moment = require('moment');

module.exports = {
  scrapeCalendars: function() {
    Calendar.scrape().catch(err => {
      console.error(err);
    });
  },
  scrapeEvents: function(start, end) {
    start = start || moment().subtract(1, 'month');
    end = end || moment().add(12, 'months');
    Event.scrape(start, end).catch(err => {
      console.error(err);
    });
  }
};