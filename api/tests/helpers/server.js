var nock = require('nock'),
    ACS_SITENUMBER = process.env.ACS_SITENUMBER;
    
var eventPages = [
  require('./events-page-1.json'),
  require('./events-page-2.json'),
  require('./events-page-3.json'),
];

var calendarResponse = require('./calendars.json');

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

nock.enableNetConnect();

module.exports = {
  create: function () {
    nock.disableNetConnect();
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
      .reply(200, JSON.stringify(switcheroo(eventPages[2])));
      
    nock('https://secure.accessacs.com/api_accessacs_mobile/v2/' + ACS_SITENUMBER)
      .get('/calendars')
      .reply(200, JSON.stringify(calendarResponse))
      .get('/calendars')
      .reply(200, JSON.stringify(switcheroo(calendarResponse)));
  },
  destroy: function () {
    nock.enableNetConnect();
  }
};