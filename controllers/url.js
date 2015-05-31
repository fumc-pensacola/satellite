var request = require('request');

module.exports = function (server) {

  server.get('/api/url/test', function (req, res) {
    request({
      url: req.query.url,
      method: 'HEAD'
    }, function (error, response, body) {
      if (error) {
        res.json({ found: false });
      } else {
        res.json({ found: true });
      }
    });
  });

};
