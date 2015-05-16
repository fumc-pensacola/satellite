var mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    NODE_ENV = process.env.NODE_ENV,
    MONGO_URI = NODE_ENV === 'test' ? process.env.MONGO_TEST : process.env.MONGOLAB_URI;

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
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
    next();
  };

  // I don't think we have any application/x-www-form-urlencoded requests
  // server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(allowCrossDomain);
  if (NODE_ENV === 'production') {
    // TODO reenable after getting an SSL certificate
    // server.use(forceSSL);
  }
  
  return new Promise(function(resolve, reject) {
    mongoose.connect(MONGO_URI, resolve);
  });
};
