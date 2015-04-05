var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY);

module.exports = function (server) {

  server.post('/api/emailer/send', function (req, res) {
    req.models.setting.find().run(function(err, models) {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        sendgrid.send({
          to: models.filter(function (s) { return s.key === 'prayer_request_email'; })[0].value,
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
