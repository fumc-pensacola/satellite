var inflectorController = require('./inflector'),
    Authentication = require('../authentication');

module.exports = function (server) {

  server.get('/api/:modelName', function (req, res) {
    inflectorController.findMany(req, res);
  });

  server.get('/api/:modelName/:id', function (req, res) {
    inflectorController.findOne(req, res);
  });

  server.put('/api/:modelName/:id', function (req, res) {
    if (Authentication.isAuthenticatedRequest(req)) {
      inflectorController.put(req, res);
    } else {
      res.status(401).send('Invalid token');
    }
  });

  server.post('/api/:modelName', function (req, res) {
    if (Authentication.isAuthenticatedRequest(req)) {
      inflectorController.post(req, res);
    } else {
      res.status(401).send('Invalid token');
    }
  });

  server.delete('/api/:modelName/:id', function (req, res) {
    if (Authentication.isAuthenticatedRequest(req)) {
      inflectorController.delete(req, res);
    } else {
      res.status(401).send('Invalid token');
    }
  });

};
