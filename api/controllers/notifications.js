var moment = require('moment-timezone'),
    request = require('request'),
    Authentication = require('../authentication'),
    ZEROPUSH_TOKEN = process.env[process.env.NODE_ENV === 'production' ? 'ZEROPUSH_PROD_TOKEN' : 'ZEROPUSH_DEV_TOKEN'];

module.exports = function (router) {
  
  router.post('/notify/:channel', function (req, res) {
    if (Authentication.isAuthenticatedRequest(req)) {
      var notification = req.body.notification,
          channel = req.params.channel.replace('everyone', '');
      
      request.post({
        url: 'https://api.zeropush.com/broadcast/' + channel,
        form: {
          auth_token: ZEROPUSH_TOKEN,
          alert: notification.message,
          expiry: Math.floor(new Date(notification.expirationDate).getTime() / 1000),
          badge: '+1',
          info: JSON.stringify({
            id: notification.id,
            url: notification.url,
            sendDate: moment.tz(notification.sendDate, 'US/Central').format()
          })
        }
      }, function (error, response, body) {
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