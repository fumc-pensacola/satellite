var orm = require('orm'),
    inflectorController = require('./controllers/inflector'),
    dbUrl = process.env.DATABASE_URL + '?ssl=true',
    Authentication = require('../authentication');

module.exports = function (server) {

  server.use(orm.express(dbUrl, {
    define: function (db, models, next) {

      models.bulletin = require('./models/bulletin')(db);
      models.witness = require('./models/witness')(db);
      models.setting = require('./models/setting')(db);
      models.feature = require('./models/feature')(db);
      models.notification = require('./models/notification')(db);
      models.calendar = require('./models/calendar')(db);

      models.notification.hasOne('feature', models.feature);

      db.settings.set('instance.returnAllErrors', true);
      // db.drop();
      db.sync();

      next();
    }
  }));

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
