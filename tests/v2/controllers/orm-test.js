"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') }); } catch (e) {}

let assert = require('assert'),
    request = require('request'),
    server = require('../../helpers/server'),
    startApp = require('../../../index'),
    db = require('../../helpers/db'),
    appServer, base;
    
describe('ORM v2', () => {
  
  before(function(done) {
    this.timeout(3000);
    startApp().then(resolutions => {
      appServer = resolutions[1];
      base = 'http://localhost:' + appServer.address().port + '/api/v2';
      return db.clear();
    }, done).then(() => {
      return db.seed();
    }, done).then(() => done()).catch(done);
  });
  
  after(done => {
    appServer.close();
    db.disconnect().then(done);
  });
  
  it('can GET a list of records', done => {
    request.get(base + '/bulletins', {
      json: true
    }, (err, response, body) => {
      assert.ok(!err);
      assert.equal(body.data.length, 2);
      done();
    });
  });
  
  it('can GET a single record', done => {
    request.get(base + '/calendars/43c1cc21-573b-483b-a6a2-a3f80136df06', {
      json: true
    }, (err, response, body) => {
      assert.ok(!err);
      assert.equal(body.data.name, 'Children');
      done();
    });
  });
  
  it('can GET a record’s *-to-one relationship', done => {
    request.get(base + '/events/e95301de-4663-4d81-961a-a35600ebeb80/links/calendar', {
      json: true
    }, (err, response, body) => {
      assert.ok(!err);
      assert.equal(body.data.type, 'calendars');
      done();
    });
  });
  
  // calendars/{id}/links/events doesn’t work,
  // because we’re not storing an array of events on Calendar.
  // This relationship should only be retrieved event -> calendar.
  it('can GET a record’s *-to-many relationships by filtering ref', done => {
    request.get(base + '/events?filter[simple][calendar]=43c1cc21-573b-483b-a6a2-a3f80136df06', {
      json: true
    }, (err, response, body) => {
      assert.ok(!err);
      assert.equal(body.data.length, 1);
      done();
    });
  });
  
});