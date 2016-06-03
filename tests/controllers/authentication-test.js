"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env.test') }); } catch (e) {} // eslint-disable-line

let assert = require('assert'),
    request = require('supertest'),
    server = require('../helpers/server'),
    startApp = require('../../index'),
    db = require('../helpers/db'),
    scopes = require('../../utils/scopes'),
    AccessToken = require('../../models/identity/access-token'),
    appServer;

describe('Authentication', () => {
  before(done => {
    startApp().then(resolutions => {
      appServer = resolutions[1];
      server.create();
      return db.clear();
    }, done).then(() => {
      return db.seed();
    }, done).then(() => done()).catch(done);
  });

  after(done => {
    server.destroy();
    appServer.close();
    db.disconnect().then(done);
  });

  it('returns 401 when requesting protected routes without a token', done => {
    request(appServer)
      .get('/v3/directory/families')
      .expect(401, done);
  });

  it('prevents tampering with X-Auth-Service-Provider', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://malicious.url')
      .expect(400, done);
  });

  it('prevents tampering with oauth_consumer_key', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://api.digits.com/validate_credentials.json')
      .set('oauth_consumer_key', 'SomeoneElsesAppsConsumerKey')
      .expect(400, done);
  });

  it('grants a JWT with restricted scopes after a non-member Digits login', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://api.digits.com/validate_credentials.json')
      .set('X-Verify-Credentials-Authorization', 'OAuthCredentialsFromNonMemberLogin')
      .set('oauth_consumer_key', process.env.DIGITS_CONSUMER_KEY)
      .expect(200, (err, res) => {
        if (err) return done(err);
        assert.ok(/[-\w]+\.[-\w]+\.[-\w]/i.test(res.body.access_token));
        assert.deepEqual(res.body.scopes, []);
        done();
      });
  });

  let tokenId;
  it('grants a JWT with directory scopes after a member Digits login', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://api.digits.com/validate_credentials.json')
      .set('X-Verify-Credentials-Authorization', 'OAuthCredentialsFrom8503246214Login')
      .set('oauth_consumer_key', process.env.DIGITS_CONSUMER_KEY)
      .expect(200, (err, res) => {
        if (err) return done(err);
        assert.ok(res.body.id);
        tokenId = res.body.id;
        assert.ok(/[-\w]+\.[-\w]+\.[-\w]/i.test(res.body.access_token));
        assert.deepEqual(res.body.scopes, [scopes.directory.fullReadAccess]);
        assert.ok(res.body.needsVerification);
        done();
      });
  });

  it('creates a User and associates the Member by phone number', done => {
    AccessToken.findById(tokenId).exec().then(token => (
      token.populate('user').execPopulate()
    )).then(token => (
      token.user.populate('member').execPopulate()
    )).then(user => {
      assert.ok(user.member);
      assert.ok(user.member.phones.find(p => p.value === user.phone));
      assert.equal(user.firstName, user.member.firstName);
      assert.equal(user.lastName, user.member.lastName);
      done();
    }).catch(done);
  });

  let signedToken;
  it('uses the associated Member when a known User logs in', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://api.digits.com/validate_credentials.json')
      .set('X-Verify-Credentials-Authorization', 'OAuthCredentialsFrom8503246214Login')
      .set('oauth_consumer_key', process.env.DIGITS_CONSUMER_KEY)
      .expect(200, (err, res) => {
        if (err) return done(err);
        signedToken = res.body.access_token;
        tokenId = res.body.id;
        assert.ok(!res.body.needsVerification);
        done();
      });
  });

  it('refreshes a token', done => {
    request(appServer)
      .post(`/v3/authenticate/digits/refresh/${tokenId}`)
      .set('Authorization', `Bearer ${signedToken}`)
      .expect(200, (err, res) => {
        if (err) return done(err);
        assert.ok(res.body.id);
        assert.notEqual(tokenId, res.body.id);
        assert.equal(res.body.user.firstName, 'Andrew');
        done();
      });
  })

});
