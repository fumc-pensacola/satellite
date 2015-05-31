"use strict";

let request = require('request');

module.exports = function(server) {

  server.get('/api/url/test', (req, res) => {
    request({
      url: req.query.url,
      method: 'HEAD'
    }, (error, response, body) => {
      if (error) {
        res.json({ found: false });
      } else {
        res.json({ found: true });
      }
    });
  });

};
