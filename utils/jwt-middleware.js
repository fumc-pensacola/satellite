"use strict";

const AccessToken = require('../models/identity/access-token');
const jwt = require('express-jwt');

const isRevoked = (req, payload, done) => {
  AccessToken.findById(payload.jti).exec().then(token => {
    if (!token) return done(null, true);
    return done(null, token.isRevoked);
  }).catch(done);
};

module.exports = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'token',
  isRevoked
});
