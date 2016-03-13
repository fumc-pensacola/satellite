"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env.test') }); } catch (e) {} // eslint-disable-line

let assert = require('assert'),
    request = require('supertest'),
    server = require('../helpers/server'),
    startApp = require('../../index'),
    db = require('../helpers/db'),
    scopes = require('../../utils/scopes'),
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
        if (err) throw err;
        assert.ok(/[-\w]+\.[-\w]+\.[-\w]/i.test(res.body.access_token));
        assert.deepEqual(res.body.scopes, []);
        done();
      });
  });
  
  it('grants a JWT with directory scopes after a member Digits login', done => {
    request(appServer)
      .post('/v3/authenticate/digits')
      .set('X-Auth-Service-Provider', 'https://api.digits.com/validate_credentials.json')
      .set('X-Verify-Credentials-Authorization', 'OAuthCredentialsFrom8503246214Login')
      .set('oauth_consumer_key', process.env.DIGITS_CONSUMER_KEY)
      .expect(200, (err, res) => {
        if (err) throw err;
        assert.ok(/[-\w]+\.[-\w]+\.[-\w]/i.test(res.body.access_token));
        assert.deepEqual(res.body.scopes, [scopes.directory.fullReadAccess]);
        done();
      });
  });
  
});
