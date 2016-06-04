"use strict";

let request = require('request'),
    url = require('url'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    get = require('lodash/fp/get'),
    curry = require('lodash/curry'),
    jwtMiddleware = require('../utils/jwt-middleware'),
    Authentication = require('../authentication'),
    Member = require('../models/member'),
    AccessToken = require('../models/identity/access-token'),
    User = require('../models/identity/user'),
    scopes = require('../utils/scopes'),
    noop = require('lodash/noop');

const log = process.env.NODE_ENV !== 'test' ? console.log : noop;
const warn = process.env.NODE_ENV !== 'test' ? console.warn : noop;
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

function getMemberForUser(user) {
  if (user.member) {
    return user.populate('member').execPopulate().then(get('member'));
  }

  return Member.findOne({ 'phones.value': user.phone }).exec();
}

const syncUserAndMember = curry((user, member) => {
  if (member) {
    user.member = member;
    user.firstName = member.firstName;
    user.lastName = member.lastName;
  }

  return user;
});

function getScopesForUser(user, member) {
  if (user.member) {
    if (!user.member.phones || !user.member.phones.some(p => p.value === user.phone)) {
      warn(`User ${user._id} phone out of sync with member ${user.member._id}`);
    }

    return [scopes.directory.fullReadAccess];
  }

  return [];
}

function createTokenForUser(user, member) {
  const scopes = getScopesForUser(user, member);
  const token = new AccessToken({
    scopes,
    user,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000
  });

  user.currentToken = token;
  return token;
}

const saveUserAndToken = curry((user, token) => {
  return Promise.all([user.save(), token.save()]);
});

function createSignedTokenString(token) {
  return jwt.sign({
    iat: token.issuedAt,
    exp: token.expiresAt,
    user: token.user.id,
    scopes: token.scopes
  }, process.env.JWT_SECRET, {
    expiresIn: '90 days',
    jwtid: token.id // this becomes req.token.jti
  });
}

const createTokenResponse = (user, token, needsVerification) => {
  needsVerification = needsVerification || false;
  const signedToken = createSignedTokenString(token);
  return {
    id: token.id,
    access_token: signedToken, // eslint-disable-line
    scopes: token.scopes,
    expires: moment(token.expiresAt).utc().format(),
    needsVerification,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }
  };
}

const tokenIdMatchesBearerTokenId = req => req.token.jti === req.params.tokenId;

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
      warn(`Potential malicious login attempt: X-Auth-Service-Provider was ${endpoint}.`);
      return res.status(400).end();
    }
    if (consumerKey !== process.env.DIGITS_CONSUMER_KEY) {
      warn(`Potential malicious login attempt: oauth_consumer_key was ${consumerKey}.`);
      return res.status(400).end();
    }

    getDigitsUser(endpoint, credentials)
      .then(findOrCreateUser)
      .then(user => {
        const needsVerification = !user.member;
        return getMemberForUser(user)
          .then(syncUserAndMember(user))
          .then(createTokenForUser)
          .then(token => (
            saveUserAndToken(user, token).then(() => {
              res.json(createTokenResponse(user, token, needsVerification));
            })
          ));
      }).catch(err => {
        console.error(err.stack);
        res.status(500).end();
      });
  });

  router.post('/authenticate/digits/refresh/:tokenId', jwtMiddleware, (req, res) => {
    if (!tokenIdMatchesBearerTokenId(req)) {
      warn(`Token id to refresh (${req.params.tokenId}) didn’t match bearer token (${req.token.jti})`);
      return res.status(401).end();
    }

    Promise.all([
      User.findById(req.token.user).populate('member').exec(),
      AccessToken.findById(req.params.tokenId).exec()
    ]).then(resolutions => {
      const user = resolutions[0];
      const oldToken = resolutions[1];
      if (!user.currentToken || user.currentToken.toString() !== oldToken.id) {
        warn(`Tried to refresh a token (${req.params.tokenId}) that did not currently belong to user (${req.token.user})`);
        return res.status(401).end();
      }

      const newToken = createTokenForUser(user, user.member);
      syncUserAndMember(user, user.member);
      oldToken.isRevoked = true;
      return Promise.all([
        saveUserAndToken(user, newToken),
        oldToken.save()
      ]).then(() => {
        res.json(createTokenResponse(user, newToken));
      });
    }).catch(err => {
      console.error(err.stack);
      res.status(500).end();
    })
  });

  router.post('/authenticate/digits/revoke/:tokenId', jwtMiddleware, (req, res) => {
    if (!tokenIdMatchesBearerTokenId(req)) {
      warn(`Token id to revoke (${req.params.tokenId}) didn’t match bearer token (${req.token.jti})`);
      return res.status(401).end();
    }

    AccessToken.findByIdAndUpdate(req.params.tokenId, {
      isRevoked: true
    }).exec().then(() => {
      res.status(204).end();
    }).catch(err => {
      console.error(err.stack);
      res.status(500).end();
    })
  });
};
