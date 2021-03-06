"use strict";

let nock = require('nock');

const ACS_SITENUMBER = process.env.ACS_SITENUMBER;
    
let eventPages = [
  require('./events-page-1.json'),
  require('./events-page-2.json'),
  require('./events-page-3.json'),
];

let calendarResponse = require('./calendars.json'),
    eventsSinglePage = require('./events-single-page.json');

function switcheroo (json) {
  // Event
  if (json.Page) {
    json.Page[0].EventName = 'Weekend at Bernie’s';
  // Calendar
  } else {
    json[0].Name = 'The Breakfast Club';
  }
  return json;
}

function deleteOne (json) {
  // Event
  if (json.Page) {
    json.Page.shift();
  } else {
    json.shift();
  }
  return json;
}

nock.enableNetConnect();

module.exports = {
  create: function() {
    nock.disableNetConnect();
    
    nock('https://secure.accessacs.com/acscfwsv2')
      .post('/wsca.asmx')
      .reply(200, '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><getLoginTokenResponse xmlns="http://acstechnologies.com/"><getLoginTokenResult>dca79857-e6d5-49c7-b982-aa69ada09ce8</getLoginTokenResult></getLoginTokenResponse></soap:Body></soap:Envelope>');
    
    nock('https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER)
      .get('/events?startdate=05%2F01%2F2015&stopdate=05%2F02%2F2015&pageIndex=0&pageSize=500')
      .reply(200, JSON.stringify(eventPages[0]))
      .get('/events?startdate=05%2F01%2F2015&stopdate=05%2F02%2F2015&pageIndex=1&pageSize=500')
      .reply(200, JSON.stringify(eventPages[1]))
      .get('/events?startdate=05%2F01%2F2015&stopdate=05%2F02%2F2015&pageIndex=2&pageSize=500')
      .reply(200, JSON.stringify(eventPages[2]))
      .get('/events?startdate=05%2F02%2F2015&stopdate=05%2F03%2F2015&pageIndex=0&pageSize=500')
      .reply(200, JSON.stringify(eventPages[0]))
      .get('/events?startdate=05%2F02%2F2015&stopdate=05%2F03%2F2015&pageIndex=1&pageSize=500')
      .reply(200, JSON.stringify(eventPages[1]))
      .get('/events?startdate=05%2F02%2F2015&stopdate=05%2F03%2F2015&pageIndex=2&pageSize=500')
      .reply(200, JSON.stringify(switcheroo(eventPages[2])))
      .get('/events?startdate=05%2F03%2F2015&stopdate=05%2F03%2F2015&pageIndex=0&pageSize=500')
      .reply(200, JSON.stringify(eventsSinglePage))
      .get('/events?startdate=04%2F29%2F2015&stopdate=05%2F02%2F2015&pageIndex=0&pageSize=500')
      .reply(200, JSON.stringify(deleteOne(eventsSinglePage)));
      
    nock('https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER)
      .get('/calendars')
      .reply(200, JSON.stringify(calendarResponse))
      .get('/calendars')
      .reply(200, JSON.stringify(switcheroo(calendarResponse)))
      .get('/calendars')
      .reply(200, JSON.stringify(deleteOne(calendarResponse)));
  },
  destroy: function() {
    nock.enableNetConnect();
  }
};