var moment = require('moment-timezone'),
    Promise = require('es6-promise').Promise;

function sanitize (str) {
  return str.replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ');
};

function fixTimeZone (date) {
  return moment(date).add(1, 'hours').tz('America/Chicago').toDate();
};

function ACS (ACSGeneralService, ACSEventService) {

  var secId = '_ane=U&RAP_u4aS-a5ebreJufU',
      siteId = 10978,
      mainCalendarId = '59a420c9-6854-43d4-89da-08e3ffa4e07f',
      token = null;

  this.tokenExpiry = moment();

  this.login = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      console.log('Logging in...');
      ACSGeneralService.getLoginToken({ secid: secId, siteid: siteId }, function (err, response) {
        if (err || !response.getLoginTokenResult) {
          console.log('Error logging in.', err);
          reject(err || new Error('getLoginToken failed'));
        } else {
          self.tokenExpiry = moment().add(59, 'minutes');
          token = response.getLoginTokenResult;
          console.log('Logged in!');
          resolve(self);
        }
      });
    });
  };

  this.loggedIn = function () {
    return token && this.tokenExpiry > new Date();
  };

  this.getCalendars = function () {
    return new Promise(function (resolve, reject) {
      ACSEventService.getCalendars({ token: token, isPublished: true }, function (err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(response.getCalendarsResult.diffgram.NewDataSet.dbs.map(function (c) {
            return { id: c.CalendarID, name: c.CalendarName };
          }));
        }
      })
    });
  };

  this.getCalendarEvents = function (calendar, from, to) {

    var self = this;
    var calendarId = new Promise(function (resolve, reject) {
      if (calendar.toLowerCase() === 'all') {
        resolve(null);
      } else if (/([a-f0-9]+?-)+?/.test(calendar)) {
        resolve(calendar);
      } else {
        self.getCalendars().then(function (calendars) {
          for (var i = 0; i < calendars.length; i++) {
            if (calendars[i].name.toLowerCase().replace(/[^a-z0-9]/g, '') === calendar.toLowerCase()) {
              resolve(calendars[i].id);
              break;
            }
          }
        });
      }
    });

    return new Promise(function (resolve, reject) {

      calendarId.then(function (id) {

        var params = {
              token: token,
              startdate: moment(from).format('YYYY-MM-DD'),
              stopdate: moment(to).format('YYYY-MM-DD'),
              CalendarId: id
            },
            method = 'getCalendarEvents';

        if (!id) {
          delete params.CalendarId;
          method = 'getEventsByDateRange';
        }

        ACSEventService[method](params, function (err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response[method + 'Result'].diffgram.NewDataSet.dbs.map(function (e) {
              if (e.isPublished !== false) {
                return new ACS.CalendarEvent(e);
              }
            }));
          }
        });
      });
    });
  };

};

ACS.CalendarEvent = function (e) {
  this.id = e.EventId || e.eventId;
  this.calendar = e.CalendarName;
  this.name = e.EventName;
  this.description = e.Description ? sanitize(e.Description) : null;
  this.from = fixTimeZone(e.StartDate || e.startdate);
  this.to = fixTimeZone(e.StopDate || e.stopdate);
};

module.exports = ACS;
