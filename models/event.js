"use strict";

let mongoose = require('mongoose'),
    request = require('request'),
    moment = require('moment-timezone'),
    Calendar = require('./calendar');
    
const ACS_USERNAME = process.env.ACS_USERNAME,
      ACS_PASSWORD = process.env.ACS_PASSWORD,
      ACS_SITENUMBER = process.env.ACS_SITENUMBER,
      NODE_ENV = process.env.NODE_ENV;

let schema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  location: { type: String },
  calendar: { type: String, ref: 'Calendar' }
}, {
  autoIndex: NODE_ENV !== 'production'
});

function makeRequest(url, start, end, page) {
  return new Promise((resolve, reject) => {
    request(url, {
      json: true,
      auth: {
        user: ACS_USERNAME,
        pass: ACS_PASSWORD
      },
      qs: {
        startdate: moment(start).format('L'),
        stopdate: moment(end).format('L'),
        pageIndex: page,
        pageSize: 500 // Max 500
      }
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      if (!body || !body.Page) {
        return reject(new Error('ACS API response was not as expected: ' + body));
      }
      
      let pages = [];
      
      // Recur for other pages
      if (page === 0) {
        pages = Array.apply(0, new Array(body.PageCount - 1)).map((x, i) => {
          return makeRequest(url, start, end, i + 1);
        });
        
        return Promise.all(pages).then(pages => {
          resolve(body.Page.concat([].concat.apply([], pages)));
        }, reject);
      }
      
      resolve(body.Page);
    });
  });
}

schema.statics.scrape = function(start, end, page) {
  let Event = this;
  return new Promise((resolve, reject) => {
    let url = 'https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER + '/events';
    page = page || 0;
    
    makeRequest(url, start, end, page).then(events => {
      return Promise.all(events.map(e => {
        return new Promise((res, rej) => {
          e = Event.transform(e);
          let id = e._id;
          delete e._id;
          Event.update({ _id: id }, e, { upsert: true }, (err, n, result) => {
            if (err) {
              rej(err);
            } else {
              e._id = id;
              res(e);
            }
          });
        });
      }));
    }, reject).then(events => {
      Event.find()
        .where('start').gte(start).lte(end)
        .where('_id').nin(events.map(e => e._id))
        .remove().exec(err => {
          if (err) {
            throw err;
          }
          resolve(events);
        });
    }, reject).catch(reject);
  });
};

schema.statics.transform = function(event) {
  let map = {
    Description: 'description',
    EventDateId: '_id',
    EventName: 'name',
    Location: 'location',
    StartDate: e => ['start', new Date(e.StartDate + ' ' + moment.tz(new Date(e.StartDate), 'America/Chicago').zoneAbbr())],
    StopDate: e => ['end', new Date(e.StopDate + ' ' + moment.tz(new Date(e.StopDate), 'America/Chicago').zoneAbbr())],
    CalendarId: 'calendar'
  }, e = { };
  
  for (let key in event) {
    if (map[key]) {
      if (map[key] instanceof Function) {
        let hash = map[key](event);
        e[hash[0]] = hash[1];
      } else {
        e[map[key]] = event[key];
      }
    }
  }
  
  return e;
};

module.exports = mongoose.models.Event || mongoose.model('Event', schema);
