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

  server.configure(function() {
    server.use(express.json());
    server.use(express.urlencoded());
    server.use(allowCrossDomain);
    if (NODE_ENV === 'production') {
      server.use(forceSSL);
    }
  });

};
