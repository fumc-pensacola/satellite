"use strict";

let request = require('request'),
    url = require('url'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    Authentication = require('../authentication'),
    Member = require('../models/member'),
    AccessToken = require('../models/identity/access-token'),
    User = require('../models/identity/user'),
    scopes = require('../utils/scopes'),
    noop = require('lodash/noop');

const log = process.env.NODE_ENV !== 'test' ? log : noop;    
const AMAZON_CLIENT_ID = process.env.AMAZON_CLIENT_ID;

function getDigitsUser(url, token) {
  return new Promise((resolve, reject) => {
    request.get({
      url,
      json: true,
      headers: { 'Authorization': token }
    }, (err, response, body) => {
      if (err) return reject(err);
      resolve(body);
    });
  });
}

function findOrCreateUser(digitsUser) {
  return User.findOne({ digitsId: digitsUser.id }).exec().then(user => {
    if (user) return user;
    return User.create({
      digitsId: digitsUser.id,
      phone: digitsUser.phone_number
    });
  });
}

function getScopesForUser(user) {
  return Member.findOne({ 'phones.value': user.phone }).exec().then(member => {
    if (member) return [scopes.directory.fullReadAccess];
    return [];
  });
}

function createTokenForUser(user) {
  return getScopesForUser(user).then(scopes => {
    let token = new AccessToken({
      scopes,
      user,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000
    });

    user.currentToken = token;
    return token;
  });
}

function saveUserAndToken(user, token) {
  return Promise.all([user.save(), token.save()]);
};

function createSignedTokenString(token) {
  return jwt.sign({
    iat: token.issuedAt,
    exp: token.expiresAt,
    user: token.user.id,
    scopes: token.scopes
  }, process.env.JWT_SECRET, {
    expiresIn: '90 days',
    jwtid: token.id
  });
}

module.exports = function(router) {

  router.post('/authenticate', bodyParser.urlencoded({ extended: false }), (req, res) => {
    request({
      url: 'https://api.amazon.com/auth/o2/tokeninfo',
      qs: { 'access_token': req.body.access_token }
    }, (err, response, body) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reaching Amazon authenticator');
        return;
      }

      let data = JSON.parse(body),
          users = [
            'amzn1.account.AFC2TKGPU7KRSE4SEKWMGEV56PSA', // Drew
            'amzn1.account.AGWSVRRT7XXKLFRXVK3VRD4ZFQFA', // Jeb
            'amzn1.account.AGNCNKDH6G3BYYXF7JP4WJHEFJDQ'  // Kyle
          ];

      if (data.aud !== AMAZON_CLIENT_ID) {
        res.status(401).send('Invalid token');
        return;
      }

      log(data.user_id);

      if (!~users.indexOf(data.user_id)) {
        res.status(401).send('User not whitelisted');
        return;
      }

      Authentication.setAuthToken(req.body.access_token);

      request({
        url: 'https://api.amazon.com/user/profile',
        headers: { 'Authorization': 'bearer ' + req.body.access_token }
      }, (err, response, body) => {
        let data = JSON.parse(body);
        res.send({
          success: true,
          token: req.body.access_token,
          name: data.name,
          email: data.email
        });
      });

    });
  });

  router.post('/authenticate/digits', (req, res) => {
    let endpoint = req.headers['x-auth-service-provider'],
        credentials = req.headers['x-verify-credentials-authorization'],
        consumerKey = req.headers['oauth_consumer_key'];

    if (url.parse(endpoint).host !== 'api.digits.com') {
      log(`Potential malicious login attempt: X-Auth-Service-Provider was ${endpoint}.`);
      return res.status(400).end();
    }
    if (consumerKey !== process.env.DIGITS_CONSUMER_KEY) {
      log(`Potential malicious login attempt: oauth_consumer_key was ${consumerKey}.`);
      return res.status(400).end();
    }

    getDigitsUser(endpoint, credentials)
      .then(findOrCreateUser)
      .then(user => {
        return createTokenForUser(user).then(token => {
          return saveUserAndToken(user, token)
            .then(() => createSignedTokenString(token))
            .then(signedToken => {
              res.json({
                access_token: signedToken, // eslint-disable-line
                scopes: token.scopes,
                expires: moment(token.expiresAt).utc().format()
              });
            });
        });
      }).catch(err => {
        console.error(err.stack);
        res.status(500).end();
      });
  });
};
