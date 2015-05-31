var _get = (req, res) => {
  res.redirect(303, 'https://s3.amazonaws.com/fumcappfiles/' + req.params.key);
};

var _exports = function (router) {
  router.get('/file/:key', _get);
};

// The Ember http-mock can use the exact same function,
// so we want to expose it here for importing.
_exports._get = _get;

module.exports = _exports;