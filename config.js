"use strict";

let mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.Promise = Promise;
const NODE_ENV = process.env.NODE_ENV,
      MONGO_URI = NODE_ENV === 'test' ? process.env.MONGO_TEST : process.env.MONGOLAB_URI;

module.exports = function(server) {

  let forceSSL = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  };

  let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
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
  
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI, err => {
      if (err) {
        return reject(err);
      }
      console.log('Database connected');
      resolve();
    });
  });
};
