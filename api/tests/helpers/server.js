var nock = require('nock'),
    ACS_SITENUMBER = process.env.ACS_SITENUMBER;
    
var eventPages = [
  require('../helpers/events-page-1.json'),
  require('../helpers/events-page-2.json'),
  require('../helpers/events-page-3.json'),
];

function switcheroo (json) {
  json.Page[0].EventName = 'Weekend at Bernie’s';
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
  },
  destroy: function () {
    nock.enableNetConnect();
  }
};