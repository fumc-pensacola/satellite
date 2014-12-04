var moment = require('moment-timezone'),
    Promise = require('es6-promise').Promise;

function sanitize (str) {
  return str.replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ');
}

function fixTimeZone (date) {
  return moment(date).add(1, 'hours').tz('America/Chicago').toDate();
}

function matchCalendar (calendars, name) {
  for (var i = 0; i < calendars.length; i++) {
    if (calendars[i].name.toLowerCase().replace(/[^a-z0-9]/g, '') === name.toLowerCase()) {
      return calendars[i];
    }
  }
}

function matchLocation (locations, id) {
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].id === id) {
      return locations[i];
    }
  }
}

function intersect (a, b) {
  var ai = bi= 0;
  var result = [];

  while (ai < a.length && bi < b.length) {
    if      (a[ai] < b[bi] ) { ai++; }
    else if (a[ai] > b[bi] ) { bi++; }
    else {
      result.push(ai);
      ai++;
      bi++;
    }
  }
  return result;
}

function fixDBS (dbs) {
  if (dbs instanceof Array) {
    return dbs;
  }
  return [dbs];
}

function ACS (ACSGeneralService, ACSEventService) {

  var secId = '_ane=U&RAP_u4aS-a5ebreJufU',
      siteId = 10978,
      mainCalendarId = '59a420c9-6854-43d4-89da-08e3ffa4e07f',
      excludeFromPublicTagId = '34e52691-93a1-4f08-9d74-a3f700da04b9',
      token = null,
      calendars = [],
      locations = [];

  var getExcludedEventIds = function () {
    return new Promise(function (resolve, reject) {
      ACSEventService.getTagsbyTagID({ token: token, tagid: excludeFromPublicTagId }, function (err, response) {
        if (err || !response.getTagsbyTagIDResult) {
          console.error('Error getting excluded event IDs');
          reject(err || new Error('getExcludedEventIds failed'));
        } else {
          resolve(fixDBS(response.getTagsbyTagIDResult.diffgram.NewDataSet.dbs).map(function (j) {
            return j.EventId;
          }));
        }
      });
    });
  };

  this.tokenExpiry = moment();

  this.login = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      console.log('Logging in...');
      ACSGeneralService.getLoginToken({ secid: secId, siteid: siteId }, function (err, response) {
        if (err || !response.getLoginTokenResult) {
          console.error('Error logging in.', err);
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

  this.getLocations = function () {
    return new Promise(function (resolve, reject) {
      ACSEventService.getResourcesByType({ token: token, typeID: 2 }, function (err, response) {
        if (err) {
          console.error('Could not get locations.', err);
          reject(err);
        } else {
          resolve(locations = fixDBS(response.getResourcesByTypeResult.diffgram.NewDataSet.dbs).map(function (l) {
            return new ACS.Location(l);
          }));
        }
      });
    });
  };

  this.getCalendars = function () {
    return new Promise(function (resolve, reject) {
      ACSEventService.getCalendars({ token: token, isPublished: true }, function (err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(calendars = fixDBS(response.getCalendarsResult.diffgram.NewDataSet.dbs).map(function (c) {
            return { id: c.CalendarID, name: c.CalendarName };
          }));
        }
      })
    });
  };

  this.getCalendarEvents = function (calendar, from, to) {
    var self = this,
    locationsRequest = self.getLocations(),
    excludedEventIdsRequest = getExcludedEventIds(),
    calendarId = new Promise(function (resolve, reject) {
      if (calendar.toLowerCase() === 'all') {
        resolve(null);
      } else if (/([a-f0-9]+?-)+?/.test(calendar)) {
        resolve(calendar);
      } else {
        var c;
        if (c = matchCalendar(calendars, calendar)) {
          resolve(c.id);
        } else {
          self.getCalendars().then(function (calendars) {
            if (c = matchCalendar(calendars, calendar)) {
              resolve(c.id);
            } else {
              reject(new Error('Could not find calendar with name: ' + calendar));
            }
          });
        }
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
            console.error(method + ' failed.', err);
            reject(err);
          } else {
            var requestedLocationIds = [],
            cachedLocationIds = locations.map(function (l) { return l.id; }),
            needsLocationCacheUpdate = false,
            events = response[method + 'Result'].diffgram.NewDataSet.dbs.map(function (e) {
              if (e.isPublished !== false) {
                var event = new ACS.CalendarEvent(e);
                event.locationId && requestedLocationIds.push(event.locationId);
                return event;
              }
            });

            for (var i = 0; i < requestedLocationIds.length; i++) {
              if (!~cachedLocationIds.indexOf(requestedLocationIds[i])) {
                needsLocationCacheUpdate = true;
                break;
              }
            }

            function processLocations (locations) {
              for (i = 0; i < events.length; i++) {
                var event = events[i], l;
                if (!event.locationId) {
                  event.location = null;
                } else if (l = matchLocation(locations, event.locationId)) {
                  event.location = l;
                } else {
                  event.location = null;
                }
              }
            }

            if (needsLocationCacheUpdate) {
              console.log('Requesting locations');
              locationsRequest.then(processLocations);
            } else {
              console.log('Using cached locations');
              processLocations(locations);
              locationsRequest = Promise.resolve();
            }

            Promise.all([locationsRequest, excludedEventIdsRequest]).then(function (values) {
              var excludedEventIds = values[1];
              var result = events.filter(function (e) {
                return !~excludedEventIds.indexOf(e.id);
              });
              resolve(result);
            });
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
  this.locationId = e.locationid || e.LocationID || null;
};

ACS.Location = function (l) {
  this.id = l.resourceid;
  this.name = l.resourcename;
  this.description = l.description;
}

module.exports = ACS;
