var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY),
    Setting = require('../models/setting');

module.exports = function (server) {

  server.post('/api/emailer/send', function (req, res) {
    Setting.findOne({ key: 'prayer_request_email' }).exec(function(err, model) {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        sendgrid.send({
          to: model.value,
          from: 'app@fumcpensacola.com',
          subject: 'New prayer request submission',
          text: 'A user of the FUMC app just submitted a prayer request:\r\n\r\n' + req.body.email
        }, function (err, json) {
          if (err) {
            console.error(err);
            res.status(500).json(err);
          } else {
            res.json(json);
          }
        });
      }
    });
  });

};
