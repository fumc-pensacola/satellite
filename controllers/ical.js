"use strict";

let ical = require('icalendar'),
    moment = require('moment-timezone'),
    Calendar = require('../models/calendar'),
    Event = require('../models/event');
    
function die(res, err) {
  console.error(err);
  res.status(500).end();
}

function sanitize(str) {
  return (str || '').replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ');
}

module.exports = function(router) {
  
  router.get('/ical/:id.ics', (req, res) => {
  
    let from = req.query.from ? new Date(req.query.from) : moment().subtract(1, 'years'),
        to = req.query.to ? new Date(req.query.to) : moment().add(1, 'years');
        
    let calendarId = req.params.id === 'all' ? Promise.resolve(/.*/) : new Promise((resolve, reject) => {
      Calendar.findOne()
        .or({ _id: req.params.id })
        .or({ name: req.params.id })
        .exec((err, calendar) => {
          if (err || !calendar) {
            return reject(err || new Error(`Calendar “${req.params.id}” not found.`));
          }
          resolve(calendar._id);
        });
    });
    
    calendarId.then(id => {  
      Event.find({ calendar: id })
        .where('start').gte(from).lte(to)
        .exec((err, events) => {
          if (err) {
            throw err;
          }
          
          let calendar = new ical.iCalendar();
          for (let i = 0; i < events.length; i++) {
            let e = new ical.VEvent(calendar, events[i]._id);
            e.setDate(events[i].start, events[i].end);
            e.setSummary(events[i].name);
            e.setDescription(sanitize(events[i].description));
            events[i].location && e.setLocation(events[i].location);
            calendar.addComponent(e);
          }
          res.setHeader('Content-disposition', 'attachment; filename=' + req.params.id + '.ics');
          res.setHeader('Content-type', 'text/calendar');
          res.send(calendar.toString());
        });
    }, die.bind(this, res)).catch(die.bind(this, res));
  });
};
