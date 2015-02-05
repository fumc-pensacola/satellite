var loopback = require('loopback'),
    ACS = require('../models/acs'),
    Promise = require('es6-promise').Promise,
    instance = null;

module.exports = function () {

  this.connect = function () {

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

        connect = function (ds) {
          return new Promise(function (resolve, reject) {
            ds.once('connected', resolve);
          });
        };

    return new Promise(function (resolve, reject) {
      console.log('Connecting...');
      Promise.all([connect(wsca), connect(wscea)]).then(function () {
        var ACSGeneralService = wsca.createModel('wsca', { }),
            ACSEventService = wscea.createModel('wscea', { });
        console.log('Connected!');
        resolve(new ACS(ACSGeneralService, ACSEventService));
      });

    })
  };

  this.sharedInstance = function () {
    return new Promise(function (resolve, reject) {
      if (!instance) {
        this.connect().then(function (acs) {
          instance = acs;
          return acs.login();
        }).then(function (acs) {
          resolve(acs);
        });
      } else if (!instance.loggedIn()) {
        instance.login().then(function (acs) {
          resolve(acs);
        });
      } else {
        resolve(instance);
      }
    }.bind(this));
  };

  this.setup = function () {
    return this.sharedInstance();
  };

};
