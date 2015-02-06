var request = require('request'),
    Authentication = require('../authentication');

module.exports = function (server) {

  server.post('/authenticate', function (req, res) {
    request({
      url: 'https://api.amazon.com/auth/o2/tokeninfo',
      qs: { 'access_token': req.body.access_token }
    }, function (err, response, body) {
      if (err) {
        console.error(err);
        res.status(500).send('Error reaching Amazon authenticator');
        return;
      }

      var data = JSON.parse(body),
          users = [
            'amzn1.account.AFC2TKGPU7KRSE4SEKWMGEV56PSA', // Drew
            'amzn1.account.AGWSVRRT7XXKLFRXVK3VRD4ZFQFA', // Jeb
            'amzn1.account.AGNCNKDH6G3BYYXF7JP4WJHEFJDQ'  // Kyle
          ];

      if (data.aud !== 'amzn1.application-oa2-client.cfecafe9a3474592888a2823741d07d5') {
        res.status(401).send('Invalid token');
        return;
      }

      console.log(data.user_id);

      if (!~users.indexOf(data.user_id)) {
        res.status(401).send('User not whitelisted');
        return;
      }

      Authentication.setAuthToken(req.body.access_token);
      
      request({
        url: 'https://api.amazon.com/user/profile',
        headers: { 'Authorization': 'bearer ' + req.body.access_token }
      }, function (err, response, body) {
        var data = JSON.parse(body);
        res.send({
          success: true,
          token: req.body.access_token,
          name: data.name,
          email: data.email
        });
      });

    });
  });
};
