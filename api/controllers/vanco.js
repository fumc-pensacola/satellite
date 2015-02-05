var request = require('request'),
    crypto = require('crypto'),
    zlib = require('zlib'),
    vancoURL = 'https://www.vancodev.com/cgi-bin/wsnvptest.vps',
    USER_ID = process.env.VANCO_USER_ID,
    PASSWORD = process.env.VANCO_PASSWORD,
    ENCRYPTION_KEY = process.env.VANCO_ENCRYPTION_KEY,
    requestId = Math.floor(Math.random() * 90000);

function login () {
  return new Promise(function (resolve, reject) {
    request.post({
      url: vancoURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'nvpvar=requesttype=login&userid=' + USER_ID + '&password=' + PASSWORD + '&requestid=' + requestId++
    }, function (error, response, body) {
      if (error) {
        console.error('Vanco login failed: ', error);
        reject(error);
      } else if (!~body.indexOf('nvpvar=requestid=') && !!~body.indexOf('nvpvar=')) {
        var encrypted = body.slice(7, body.length);
        var decrypted = crypto.createDecipher('aes-256-ecb', ENCRYPTION_KEY);
        zlib.deflateRaw(decrypted.update(new Buffer(encrypted)), function (err, buffer) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            var urlString = buffer.toString('utf8');
            resolve(urlString.slice(10, urlString.indexOf('&requestid')));
          }
        });
      } else {
        console.error('Vanco login failed: ', body);
        reject();
      }
    });
  });
}

module.exports = function (subroot, server) {

  server.post(subroot + '/login', function (req, res) {
    login().then(function (sessionId) {
      res.send(sessionId);
    }, function (error) {
      res.status(500).send(error);
    });
  });

};
