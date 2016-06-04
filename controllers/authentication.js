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
    grantScopes = require('../utils/grant-scopes'),
    UnauthorizedError = require('../utils/unauthorized-error'),
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

// This could be synchronous for now,
// but making it work with Promises in anticipation of future scope granting functions.
const getScopesForUser = curry((requestedScopes, user, member) => {
  return Promise.all(requestedScopes.map(s => (
    Promise.resolve(grantScopes[s](user, member))
  ))).then(grants => {
    if (!grants.every(Boolean)) throw new UnauthorizedError();
    return requestedScopes;
  });
});

const createTokenForUser = curry((requestedScopes, user, member) => {
  return getScopesForUser(requestedScopes, user, member).then(scopes => {
    const token = new AccessToken({
      scopes,
      user,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000
    });

    user.currentToken = token;
    return token;
  });
});

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
        consumerKey = req.headers['oauth_consumer_key'],
        requestedScopes = req.body.scopes || [];

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
          .then(() => createTokenForUser(requestedScopes, user, user.member))
          .then(token => (
            saveUserAndToken(user, token).then(() => {
              res.json(createTokenResponse(user, token, needsVerification));
            })
          ));
      }).catch(err => {
        if (err instanceof UnauthorizedError) {
          res.status(403).end();
        } else {
          console.error(err.stack);
          res.status(500).end();
        }
      });
  });

  router.post('/authenticate/digits/refresh', jwtMiddleware, (req, res) => {
    Promise.all([
      User.findById(req.token.user).populate('member').exec(),
      AccessToken.findById(req.token.jti).exec()
    ]).then(resolutions => {
      const user = resolutions[0];
      const oldToken = resolutions[1];
      if (!user.currentToken || user.currentToken.toString() !== oldToken.id) {
        warn(`Tried to refresh a token (${req.token.jti}) that did not currently belong to user (${req.token.user})`);
        return res.status(401).end();
      }

      syncUserAndMember(user, user.member);
      oldToken.isRevoked = true;
      return createTokenForUser(req.body.scopes || [], user, user.member).then(newToken => (
        Promise.all([
          saveUserAndToken(user, newToken),
          oldToken.save()
        ]).then(() => {
          res.json(createTokenResponse(user, newToken));
        })
      )).catch(err => {
        if (err instanceof UnauthorizedError) {
          res.status(403).end();
        } else {
          console.error(err.stack);
          res.status(500).end();
        }
      });
    });
  });

  router.post('/authenticate/digits/revoke', jwtMiddleware, (req, res) => {
    AccessToken.findByIdAndUpdate(req.token.jti, {
      isRevoked: true
    }).exec().then(() => {
      res.status(204).end();
    }).catch(err => {
      console.error(err.stack);
      res.status(500).end();
    })
  });

  router.post('/authenticate/digits/request', jwtMiddleware, (req, res) => {

  });
};
