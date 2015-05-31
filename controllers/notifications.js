var moment = require('moment-timezone'),
    request = require('request'),
    Authentication = require('../authentication');

module.exports = function (router) {
  
  router.post('/notify/:channel', (req, res) => {
    if (Authentication.isAuthenticatedRequest(req)) {
      var notification = req.body.notification,
          channel = req.params.channel.replace('everyone', ''),
          tokenEnvironment = req.body.tokenEnvironment;
      
      request.post({
        url: 'https://api.zeropush.com/broadcast/' + channel,
        form: {
          auth_token: process.env[tokenEnvironment],
          alert: notification.message,
          expiry: Math.floor(new Date(notification.expirationDate).getTime() / 1000),
          badge: '+1',
          info: JSON.stringify({
            id: notification.id,
            url: notification.url,
            sendDate: moment.tz(notification.sendDate, 'US/Central').format()
          })
        }
      }, (error, response, body) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(201).json(notification);
        }
      });
    } else {
      res.status(401).end();
    }
  });
  
};