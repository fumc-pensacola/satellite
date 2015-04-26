var Notification = require('../../models/notification');

module.exports = function (router) {

  router.get('/notifications/current', function (req, res) {
    if (req.query.tester === true || (typeof req.query.tester === 'string' && req.query.tester.toLowerCase() === "true")) {
      delete req.query.tester;
    } else {
      req.query.test = false;
    }
    Notification.find(req.query).where('expirationDate').gt(new Date()).sort('-sendDate').exec(function(err, models) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        models.forEach(function (m) {
          m._doc.id = parseInt(String(Date.now()).substr(4));
        });
        res.json(models);
      }
    });
  });

};
