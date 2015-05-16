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
  return new Promise(function (resolve, reject) {
    var url = 'https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER + '/calendars';
    request.get(url, {
      json: true,
      auth: {
        user: ACS_USERNAME,
        pass: ACS_PASSWORD
      }
    }, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        Promise.all(body.map(function (c) {
          if (!c.IsPublished) {
            return Promise.resolve();
          }
          return new Promise(function (res, rej) {
            c = Calendar.transform(c);
            var id = c._id;
            delete c._id;
            Calendar.update({ _id: id }, c, { upsert: true }, function (err) {
              if (err) {
                rej(err);
              } else {
                res(c);
              }
            });
          });
        })).then(function () {
          resolve();
        }, function (err) {
          reject(err);
        });
      }
    });
  });
};

schema.statics.transform = function (calendar) {
  calendar._id = calendar.CalendarId;
  calendar.name = calendar.Name;
  calendar.description = calendar.Description;
  delete calendar.Name;
  delete calendar.Description;
  delete calendar.RssSlug;
  delete calendar.IsPublished;
  delete calendar.CalendarId;
};

module.exports = mongoose.model('Calendar', schema);
