var express = require('express'),
    bodyParser = require('body-parser'),
    orm = require('orm'),
    NODE_ENV = process.env.NODE_ENV,
    DATABASE_URL = process.env.DATABASE_URL + '?ssl=true';

module.exports = function (server) {

  var forceSSL = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  };

  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  };

  // I don't think we have any application/x-www-form-urlencoded requests
  // server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(allowCrossDomain);
  if (NODE_ENV === 'production') {
    server.use(forceSSL);
  }

  server.use(orm.express(DATABASE_URL, {
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

};
