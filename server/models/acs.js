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

function fixDataSet (newDataSet) {
  if (!newDataSet || !newDataSet.dbs) {
    return { dbs: [] };
  }
  if (newDataSet.dbs instanceof Array) {
    return { dbs: newDataSet.dbs };
  }
  return { dbs: [newDataSet.dbs] };
}

function ACS (ACSGeneralService, ACSEventService) {

  var secId = '_ane=U&RAP_u4aS-a5ebreJufU',
      siteId = 10978,
      mainCalendarId = '59a420c9-6854-43d4-89da-08e3ffa4e07f',
      excludeFromPublicTagId = '34e52691-93a1-4f08-9d74-a3f700da04b9',
      token = null,
      calendars = [],
      locations = [],
      colors = {
        'f088210f-648c-4236-a216-a3f900a07fd9': '#ad4c4c',
        '43c1cc21-573b-483b-a6a2-a3f80136df06': '#1cc2f2',
        '36b2b1ce-892d-4e23-82dc-a3f900a33e6d': '#553c17',
        '59a420c9-6854-43d4-89da-08e3ffa4e07f': '#841521',
        'd10a6692-e75d-4181-bf65-9fcc00dd10b3': '#2ae2b4',
        'c3a1e83f-67ea-46c1-9c3e-a3f900a5de0c': '#6995a3',
        '3afcb791-03d7-41bc-9f15-a3f900a53fe0': '#a8a8a8',
        '7a201d09-4dd6-49e6-ab49-a3f900a0c285': '#6c974e',
        '79aab762-f53a-480a-a35f-a3f9009edd65': '#dbccb0',
        '584948b7-f9da-4df9-a221-a3f9009c216a': '#de6e1c',
        'dbe63e9a-0afa-4d87-aa4e-a3f9009159ed': '#3b3b3b',
        'a187cf16-420c-47c8-8092-a3f900a6da2f': '#b4d0a1',
        'b0269954-8b75-4466-9dd3-a3f900a15359': '#002157',
        '20b18836-cc1b-4370-b24a-a3f900b7ab57': '#2d590f',
        '9c7f8b4e-d0c6-451d-8aba-a3f9009d0cd3': '#fff200',
        '3451d38a-618c-4b39-9ec3-a3f900a0f837': '#6b0f7b',
        'd78cb214-d010-4a26-8fea-a3f9009d63a9': '#ba2420',
        'b2ad88a9-2dcb-45f2-ac62-a3f900a4ddb4': '#fafafa'
      };

  var getExcludedEventIds = function () {
    return new Promise(function (resolve, reject) {
      ACSEventService.getTagsbyTagID({ token: token, tagid: excludeFromPublicTagId }, function (err, response) {
        if (err || !response.getTagsbyTagIDResult) {
          console.error('Error getting excluded event IDs');
          reject(err || new Error('getExcludedEventIds failed'));
        } else {
          resolve(fixDataSet(response.getTagsbyTagIDResult.diffgram.NewDataSet).dbs.map(function (j) {
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
          resolve(locations = fixDataSet(response.getResourcesByTypeResult.diffgram.NewDataSet).dbs.map(function (l) {
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
          resolve(calendars = fixDataSet(response.getCalendarsResult.diffgram.NewDataSet).dbs.map(function (c) {
            return { id: c.CalendarID, name: c.CalendarName, colorString: colors[c.CalendarID] };
          }));
        }
      })
    });
  };

  this.getCalendarEvents = function (calendar, from, to) {
    var self = this,
    locationsRequest = self.getLocations(),
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
          }, function () {
            reject(new Error('Failed to update calendar list'));
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
            events = fixDataSet(response[method + 'Result'].diffgram.NewDataSet).dbs.map(function (e) {
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

            locationsRequest.then(function () {
              resolve(events);
            }, function () {
              reject();
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
  this.calendarId = e.CalendarId;
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
