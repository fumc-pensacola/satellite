"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') }); } catch (e) {}

let assert = require('assert'),
    request = require('supertest'),
    server = require('../helpers/server'),
    startApp = require('../../index'),
    db = require('../helpers/db'),
    appServer;
    
describe('Authentication', () => {
  before(done => {
    startApp().then(resolutions => {
      appServer = resolutions[1];
      return db.clear();
    }, done).then(() => {
      return db.seed();
    }, done).then(() => done()).catch(done);
  });
  
  after(done => {
    appServer.close();
    db.disconnect().then(done);
  });
  
  it('returns 401 when requesting protected routes without a token', done => {
    request(appServer)
      .get('/v3/directory/families')
      .expect(401, done);
  });
  
});