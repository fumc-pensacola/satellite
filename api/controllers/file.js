var AWS = require('aws-sdk');
var s3 = new AWS.S3({ params: { Bucket: 'fumcappfiles' } });

var _get = function (req, res) {
  s3.getSignedUrl('getObject', { Key: req.params.key }, function (err, url) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.redirect(303, url);
    }
  });
};

var _exports = function (router) {
  router.get('/file/:key', _get);
};

// The Ember http-mock can use the exact same function,
// so we want to expose it here for importing.
_exports._get = _get;

module.exports = _exports;