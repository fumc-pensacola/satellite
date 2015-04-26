module.exports = function(app) {
  var express = require('express');
  var authenticateRouter = express.Router();

  authenticateRouter.post('/', function(req, res) {
    res.send({
      success: true,
      token: '0123456789',
      name: 'Tester McFly',
      email: 'mcflyby@test.io'
    });
  });

  app.use('/authenticate', authenticateRouter);
};
