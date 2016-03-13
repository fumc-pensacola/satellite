"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env.test') }); } catch (e) {}

let assert = require('assert'),
    server = require('../helpers/server'),
    db = require('../helpers/db'),
    Calendar = require('../../models/calendar');

describe('Calendar', () => {
  
  describe('scrape', () => {
    
    beforeEach(() => {
      server.create();
    });
    
    before(done => {
      db.connect().then(() => {
        db.clear();
        done();
      }).catch(done);
    });
    
    after(done => {
      server.destroy();
      db.disconnect().then(done);
    });
    
    it('should resolve to all published calendars', done => {
      Calendar.scrape().then(calendars => {
        assert.equal(calendars.length, 18);
        done();
      }, done).catch(done);
    });
    
    it('should insert calendars into the database', done => {
      Calendar.count({ }, (err, count) => {
        assert.ok(!err);
        assert.equal(count, 18);
        done();
      });
    });
    
    it('should update calendars on subsequent scrape', done => {
      Calendar.scrape().then(calendars => {
        assert.equal(calendars.length, 18);
        Calendar.count({ name: 'The Breakfast Club' }, (err, count) => {
          assert.ok(!err);
          assert.equal(count, 1);
          done();
        });
      }, done).catch(done);
    });
    
    it('should delete deleted calendars', done => {
      Calendar.scrape().then(calendars => {
        Calendar.count({ _id: 'f088210f-648c-4236-a216-a3f900a07fd9' }, (err, count) => {
          assert.ok(!err);
          assert.equal(count, 0);
          done();
        });
      }, done).catch(done);
    });
  });
  
  describe('transform', () => {
    
    it('should transform an object’s whitelisted keys', () => {
      let c = Calendar.transform({ CalendarId: '1', Name: 'Fun Times' });
      assert.equal(c._id, '1');
      assert.equal(c.name, 'Fun Times');
    });
    
    it('should exclude an object’s non-whitelisted keys', () => {
      let c = Calendar.transform({ CalendarId: '1', Name: 'Fun Times', RssSlug: 'http://goo.gl' });
      assert.ok(!c.RssSlug);
    });
  });
});