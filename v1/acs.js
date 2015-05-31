var loopback = require('loopback'),
    Promise = require('bluebird').Promise,
    moment = require('moment-timezone'),
    instance = null;

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
      dbCalendars = [];

  var getExcludedEventIds = function() {
    return new Promise((resolve, reject) => {
      try {
        ACSEventService.getTagsbyTagID({ token: token, tagid: excludeFromPublicTagId }, (err, response) => {
          if (err || !response.getTagsbyTagIDResult) {
            console.error('Error getting excluded event IDs');
            reject(err || new Error('getExcludedEventIds failed'));
          } else {
            resolve(fixDataSet(response.getTagsbyTagIDResult.diffgram.NewDataSet).dbs.map(j => {
              return j.EventId;
            }));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.tokenExpiry = moment();

  this.login = function() {
    return new Promise((resolve, reject) => {
      console.log('Logging in...');
      try {
        ACSGeneralService.getLoginToken({ secid: secId, siteid: siteId }, (err, response) => {
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
      } catch (error) {
        reject(error);
      }
    });
  };

  this.loggedIn = function() {
    return token && this.tokenExpiry > new Date();
  };

  this.getLocations = function() {
    return new Promise((resolve, reject) => {
      try {
        ACSEventService.getResourcesByType({ token: token, typeID: 2 }, (err, response) => {
          if (err) {
            console.error('Could not get locations.', err);
            reject(err);
          } else {
            resolve(locations = fixDataSet(response.getResourcesByTypeResult.diffgram.NewDataSet).dbs.map(l => {
              return new ACS.Location(l);
            }));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getCalendars = function(databaseCalendars) {
    if (databaseCalendars) {
      dbCalendars = databaseCalendars;
    }
    return new Promise((resolve, reject) => {
      try {
        ACSEventService.getCalendars({ token: token, isPublished: true }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(calendars = fixDataSet(response.getCalendarsResult.diffgram.NewDataSet).dbs.map(c => {
              var dbCalendar = dbCalendars.filter(function(cal) { return cal._doc._id === c.CalendarID; })[0] || { };
              return { id: c.CalendarID, name: c.CalendarName, colorString: dbCalendar.color, defaultImageKey: dbCalendar.image };
            }));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getCalendarEvents = function(requestedCalendars, from, to) {
    var locationsRequest = this.getLocations(),
    calendarIds = requestedCalendars.map(calendar => {
      return new Promise((resolve, reject) => {
        if (calendar.toLowerCase() === 'all') {
          resolve(null);
        } else if (/([a-f0-9]+?-)+?/.test(calendar)) {
          resolve(calendar);
        } else {
          var c;
          if (c = matchCalendar(calendars, calendar)) {
            resolve(c.id);
          } else {
            this.getCalendars().then(calendars => {
              if (c = matchCalendar(calendars, calendar)) {
                resolve(c.id);
              } else {
                reject(new Error('Could not find calendar with name: ' + calendar));
              }
            }, () => {
              reject(new Error('Failed to update calendar list'));
            });
          }
        }
      });
    });

    return new Promise((resolve, reject) => {

      var apiCalls = [];

      for (var i = 0; i < calendarIds.length; i++) {
        apiCalls.push(new Promise((res, rej) => {
          calendarIds[i].then(id => {

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
            
            try {
              ACSEventService[method](params, function(err, response) {
                if (err) {
                  console.error(method + ' failed.', err);
                  rej(err);
                } else {
                  var requestedLocationIds = [],
                  cachedLocationIds = locations.map(l => l.id),
                  needsLocationCacheUpdate = false,
                  events = fixDataSet(response[method + 'Result'].diffgram.NewDataSet).dbs.map(e => {
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

                  var processLocations = function(locations) {
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
                  };

                  if (needsLocationCacheUpdate) {
                    console.log('Requesting locations');
                    locationsRequest.then(processLocations);
                  } else {
                    console.log('Using cached locations');
                    processLocations(locations);
                    locationsRequest = Promise.resolve();
                  }

                  locationsRequest.then(function() {
                    res({
                      id: id,
                      events: events
                    });
                  }, function() {
                    rej();
                  });
                }
              });
            } catch (error) {
              rej(error);
            }
          }, rej);
        }));
      }

      Promise.settle(apiCalls).then(eventsByCalendar => {
        var results = { }, i = 0;
        eventsByCalendar.forEach(p => {
          if (p.isFulfilled()) {
            results[p.value().id || ('no-id-' + i++)] = p.value().events;
          } else {
            console.error(p.reason());
          }
        });
        resolve(results);
      }, reject);
    });
  };
}

ACS.CalendarEvent = function(e) {
  this.id = e.EventId || e.eventId;
  this.calendar = e.CalendarName;
  this.calendarId = e.CalendarId;
  this.name = e.EventName;
  this.description = e.Description ? sanitize(e.Description) : null;
  this.from = fixTimeZone(e.StartDate || e.startdate);
  this.to = fixTimeZone(e.StopDate || e.stopdate);
  this.locationId = e.locationid || e.LocationID || null;
};

ACS.Location = function(l) {
  this.id = l.resourceid;
  this.name = l.resourcename;
  this.description = l.description;
};

module.exports = function() {

  this.connect = function() {
    
    try {
      var wsca = loopback.createDataSource('soap', {
            connector: 'loopback-connector-soap',
            // remotingEnabled: true,
            url: 'https://secure.accessacs.com/acscfwsv2/wsca.asmx',
            operations: {
              getLoginToken: {
                service: 'wsca',
                port: 'wscaSoap',
                operation: 'getLoginToken'
              }
            }
          }),

          wscea = loopback.createDataSource('soap', {
            connector: 'loopback-connector-soap',
            // remotingEnabled: true,
            url: 'https://secure.accessacs.com/acscfwsv2/wscea.asmx',
            operations: {
              getCalendarEvents: {
                service: 'wscea',
                port: 'wsceaSoap',
                operation: 'getCalendarEvents'
              }
            }
          }),

          connect = function(ds) {
            return new Promise((resolve, reject) => {
              ds.once('connected', resolve);
            });
          };

      return new Promise((resolve, reject) => {
        console.log('Connecting...');
        Promise.all([connect(wsca), connect(wscea)]).then(() => {
          var ACSGeneralService = wsca.createModel('wsca', { }),
              ACSEventService = wscea.createModel('wscea', { });
          console.log('Connected!');
          resolve(new ACS(ACSGeneralService, ACSEventService));
        }, reject);

      });
    } catch (error) {
      console.error('Could not connect to ACS service', error);
    }
  };

  this.sharedInstance = function() {
    return new Promise(function(resolve, reject) {
      if (!instance) {
        this.connect().then(acs => {
          instance = acs;
          return acs.login();
        }).then(acs => {
          resolve(acs);
        });
      } else if (!instance.loggedIn()) {
        instance.login().then(acs => {
          resolve(acs);
        });
      } else {
        resolve(instance);
      }
    }.bind(this));
  };

  this.setup = function() {
    return this.sharedInstance();
  };

};
