var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws.json');
var s3 = new AWS.S3({ params: { Bucket: 'fumcappfiles' } });

module.exports = function (server) {

  server.get('/api/file/:key', function (req, res) {
    s3.getSignedUrl('getObject', { Key: req.params.key }, function (err, url) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.redirect(303, url);
      }
    });
  });


};
