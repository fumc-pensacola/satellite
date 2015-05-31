"use strict";

module.exports = function(router) {
  router.get('/file/:key', (req, res) => {
    res.redirect(303, 'https://s3.amazonaws.com/fumcappfiles/' + req.params.key);
  });
};