var moment = require('moment-timezone'),
    ZEROPUSH_TOKEN = process.env[process.env.NODE_ENV === 'production' ? 'ZEROPUSH_PROD_TOKEN' : 'ZEROPUSH_DEV_TOKEN'],
    Authentication = require('../authentication'),
    Notification = require('../models/notification');

module.exports = function (server) {

  server.get('/api/notifications/current', function (req, res) {
    if (req.query.tester === true || (typeof req.query.tester === 'string' && req.query.tester.toLowerCase() === "true")) {
      delete req.query.tester;
    } else {
      req.query.test = false;
    }
    Notification.find(req.query).where('expirationDate').gt(new Date()).sort('-sendDate').exec(function(err, models) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.json(models);
      }
    });
  });

  server.post('/api/notify/:channel', function (req, res) {
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
          res.json(body);
        }
      });
    } else {
      res.status(401).send('Invalid token');
    }
  });

};
