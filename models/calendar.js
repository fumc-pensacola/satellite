var mongoose = require('mongoose'),
    request = require('request'),
    ACS_USERNAME = process.env.ACS_USERNAME,
    ACS_PASSWORD = process.env.ACS_PASSWORD,
    ACS_SITENUMBER = process.env.ACS_SITENUMBER,
    NODE_ENV = process.env.NODE_ENV;

var schema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  image: { type: String }
}, {
  autoIndex: NODE_ENV !== 'production'
});

schema.statics.scrape = function () {
  var Calendar = this;
  return new Promise((resolve, reject) => {
    var url = 'https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER + '/calendars';
    request.get(url, {
      json: true,
      auth: {
        user: ACS_USERNAME,
        pass: ACS_PASSWORD
      }
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      if (!(body instanceof Array)) {
        return reject(new Error('ACS API response was not an Array: ' + body));
      }
      Promise.all(body.map(c => {
        if (!c.IsPublished) {
          return;
        }
        return new Promise((res, rej) => {
          c = Calendar.transform(c);
          var id = c._id;
          delete c._id;
          Calendar.update({ _id: id }, c, { upsert: true }, err => {
            if (err) {
              rej(err);
            } else {
              c._id = id;
              res(c);
            }
          });
        });
      })).then(calendars => {
        calendars = [].concat.apply([], calendars).filter(c => {
          if (c) {
            return c;
          }
        });
        
        Calendar.find()
          .where('_id')
          .nin(calendars.map(c => c._id))
          .remove().exec(err => {
            if (err) {
              return reject(err);
            }
            resolve(calendars);
          });
      }, err => {
        reject(err);
      });
    });
  });
};

schema.statics.transform = function (calendar) {
  var map = {
    CalendarId: '_id',
    Name: 'name',
    Description: 'description'
  }, c = { };
  
  for (var key in calendar) {
    if (map[key]) {
      c[map[key]] = calendar[key];
    }
  }
  
  return c;
};

module.exports = mongoose.model('Calendar', schema);
