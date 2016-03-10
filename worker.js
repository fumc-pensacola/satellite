"use strict";

let Calendar = require('./models/calendar'),
    VideoAlbum = require('./models/video-album'),
    Event = require('./models/event'),
    Family = require('./models/family'),
    moment = require('moment');

module.exports = {
  scrapeCalendars: function() {
    Calendar.scrape().catch(err => {
      console.error(err.stack);
    });
  },
  scrapeEvents: function(start, end) {
    start = start || moment().subtract(1, 'month');
    end = end || moment().add(12, 'months');
    Event.scrape(start, end).catch(err => {
      console.error(err.stack);
    });
  },
  scrapeVideos: function() {
    VideoAlbum.scrape().catch(err => {
      console.error(err.stack);
    });
  },
  scrapeMembers: function() {
    Family.scrape();
  }
};
