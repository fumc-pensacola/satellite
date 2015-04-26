var moment = require('moment'),
    Promise = require('bluebird').Promise,
    ical = require('icalendar'),
    mongoose = require('mongoose'),
    Calendar = require('../models/calendar');

module.exports = function (router, ACS) {

  ACS.setup();

  router.get('/calendars/list', function (req, res) {
    var getDBCalendars = new Promise(function (resolve, reject) {
      Calendar.find().exec(function (err, models) {
        if (err) {
          reject(err);
        } else {
          resolve(models);
        }
      });
    });

    Promise.all([ACS.sharedInstance(), getDBCalendars]).then(function (values) {
      values[0].getCalendars(values[1]).then(function (calendars) {
        res.json(calendars.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }));
      }, function (reason) {
        res.status(500).json(reason);
      });
    }, function (reason) {
      res.status(500).json(reason);
    });
  });

  router.get('/calendars/:id.:format', function (req, res) {
    ACS.sharedInstance().then(function (acs) {
      console.log('Getting events...');
      var from = req.query.from ? new Date(req.query.from) : moment().subtract(1, 'years'),
          to = req.query.to ? new Date(req.query.to) : moment().add(1, 'years'),
          ids = req.params.id.split(','),
          min = req.query.min || 0;
      return acs.getCalendarEvents(ids, from, to, min);
    }).then(function (eventsByCalendar) {
      console.log('Got events!');

      var keys = Object.keys(eventsByCalendar);
      if ((req.params.format || '').toLowerCase() === 'json') {
        keys.forEach(function (key) {
          eventsByCalendar[key].sort(function (a, b) {
            return a.from - b.from;
          });
        });
        res.send(eventsByCalendar);
      } else {
        var events = [];
        for (var key in keys) {
          events = events.concat(eventsByCalendar[key]);
        }
        var calendar = new ical.iCalendar();
        for (var i = 0; i < events.length; i++) {
          var e = new ical.VEvent(calendar, events[i].id + i);
          e.setDate(events[i].from, events[i].to);
          e.setSummary(events[i].name);
          e.setDescription(events[i].description);
          events[i].location && e.setLocation(events[i].location.name);
          calendar.addComponent(e);
        }
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.id + '.ics');
        res.setHeader('Content-type', 'text/calendar');
        res.send(calendar.toString());
      }
    }, function (reason) {
      res.status(500).json(reason);
    });
  });

};
