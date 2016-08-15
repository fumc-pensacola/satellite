"use strict";

let request = require('request'),
    url = require('url'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    get = require('lodash/fp/get'),
    pick = require('lodash/pick'),
    curry = require('lodash/curry'),
    jwtMiddleware = require('../utils/jwt-middleware'),
    Authentication = require('../authentication'),
    Member = require('../models/member'),
    AccessToken = require('../models/identity/access-token'),
    AccessRequest = require('../models/identity/access-request'),
    User = require('../models/identity/user'),
    grantScopes = require('../utils/grant-scopes'),
    UnauthorizedError = require('../utils/unauthorized-error'),
    BadRequestError = require('../utils/bad-request-error'),
    noop = require('lodash/noop');

const log = process.env.NODE_ENV !== 'test' ? console.log : noop;
const warn = process.env.NODE_ENV !== 'test' ? console.warn : noop;
const AMAZON_CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const FACEBOOK_PROFILE_ENDPOINT = 'https://graph.facebook.com/me';

function getFacebookUser(token) {
  return new Promise((resolve, reject) => {
    request.get({
      url: FACEBOOK_PROFILE_ENDPOINT,
      json: true,
      qs: { 'access_token': token, fields: 'id,first_name,last_name' }
    }, (err, response, body) => {
      if (err) return reject(err);
      if (!body.id) return reject(new Error('Facebook Graph response was not as expected:', body));
      resolve(body);
    });
  });
}

function getDigitsUser(req) {
  return new Promise((resolve, reject) => {
    let endpoint = req.headers['x-auth-service-provider'],
        credentials = req.headers['x-verify-credentials-authorization'],
        consumerKey = req.headers['oauth_consumer_key'];

    if (url.parse(endpoint).host !== 'api.digits.com') {
      reject(new BadRequestError(`Potential malicious login attempt: X-Auth-Service-Provider was ${endpoint}.`));
    }
    if (consumerKey !== process.env.DIGITS_CONSUMER_KEY) {
      reject(new BadRequestError(`Potential malicious login attempt: oauth_consumer_key was ${consumerKey}.`));
    }

    request.get({
      url: endpoint,
      json: true,
      headers: { 'Authorization': credentials }
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
    user: pick(user, ['id', 'firstName', 'lastName', 'phone'])
  };
}

const createAccessRequestResponse = (accessRequest, user) => ({
  accessRequest: pick(accessRequest, ['id', 'dateRequested', 'dateSettled', 'status', 'scopes']),
  user: pick(user, ['id', 'firstName', 'lastName', 'phone']),
  actions: {
    update: {
      method: 'PATCH',
      url: `/authenticate/digits/request/${accessRequest.id}`
    },
    cancel: {
      method: 'DELETE',
      url: `/authenticate/digits/request/${accessRequest.id}`
    }
  }
});

const statusCodeErrorHandler = res => err => {
  if (err instanceof UnauthorizedError) {
    res.status(403).end();
  } else if (err instanceof BadRequestError) {
    warn(err.message);
    res.status(400).end();
  } else {
    console.error(err.stack);
    res.status(500).end();
  }
};

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
    const requestedScopes = req.body.scopes || [];
    getDigitsUser(req)
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
      }).catch(statusCodeErrorHandler(res));
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
      )).catch(statusCodeErrorHandler(res));
    });
  });

  router.post('/authenticate/digits/revoke', jwtMiddleware, (req, res) => {
    AccessToken.findByIdAndUpdate(req.token.jti, {
      isRevoked: true
    }).exec().then(() => {
      res.status(204).end();
    }).catch(statusCodeErrorHandler(res))
  });

  router.post('/authenticate/digits/request', (req, res) => {
    const scopes = req.body.scopes || [];
    getDigitsUser(req)
      .then(findOrCreateUser)
      .then(user => {
        const accessRequest = new AccessRequest({ scopes, user });
        return Promise.all([accessRequest.save(), user.save()]).then(() => {
          res.status(201).json(createAccessRequestResponse(accessRequest, user));
        });
      }).catch(statusCodeErrorHandler(res));
  });

  router.get('/authenticate/digits/request/:id', (req, res) => {
    Promise.all([
      getDigitsUser(req).then(findOrCreateUser),
      AccessRequest.findById(req.params.id).exec()
    ]).then(resolutions => {
      const user = resolutions[0];
      const accessRequest = resolutions[1];
      if (accessRequest.user.toString() !== user.id) {
        throw new BadRequestError(`Digits identified user ${user.id} trying to update AccessRequest belonging to user ${accessRequest.user.toString()}`);
      }

      res.json(createAccessRequestResponse(accessRequest, user));
    }).catch(statusCodeErrorHandler(res));
  });

  router.patch('/authenticate/digits/request/:id', (req, res) => {
    Promise.all([
      getDigitsUser(req).then(findOrCreateUser),
      AccessRequest.findById(req.params.id).exec(),
      req.body.facebookToken ? getFacebookUser(req.body.facebookToken) : null
    ]).then(resolutions => {
      const user = resolutions[0];
      const accessRequest = resolutions[1];
      const facebookUser = resolutions[2];
      if (accessRequest.user.toString() !== user.id) {
        throw new BadRequestError(`Digits identified user ${user.id} trying to update AccessRequest belonging to user ${accessRequest.user.toString()}`);
      }

      user.firstName = facebookUser.first_name;
      user.lastName = facebookUser.last_name;
      user.facebook = facebookUser.id;

      return user.save().then(() => {
        res.json(createAccessRequestResponse(accessRequest, user));
      });
    }).catch(statusCodeErrorHandler(res));
  });
};
