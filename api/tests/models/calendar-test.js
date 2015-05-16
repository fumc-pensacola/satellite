require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

var assert = require('assert'),
    server = require('../helpers/server');
    db = require('../helpers/db'),
    Calendar = require('../../models/calendar');

describe('Event', function () {
  
  describe('scrape', function () {
    
    beforeEach(function () {
      server.create();
    });
    
    before(function (done) {
      db.connect().then(function () {
        db.clear();
        done();
      });
    });
    
    after(function () {
      server.destroy();
    });
    
    it('should resolve to all published calendars', function (done) {
      Calendar.scrape().then(function (calendars) {
        assert.equal(calendars.length, 18);
        done();
      }, done).catch(done);
    });
    
    it('should insert calendars into the database', function (done) {
      Calendar.count({ }, function (err, count) {
        assert.ok(!err);
        assert.equal(count, 18);
        done();
      });
    });
    
    it('should update calendars on subsequent scrape', function (done) {
      Calendar.scrape().then(function (calendars) {
        assert.equal(calendars.length, 18);
        Calendar.count({ name: 'The Breakfast Club' }, function (err, count) {
          assert.ok(!err);
          assert.equal(count, 1);
          done();
        });
      }, done).catch(done);
    });
  });
  
  describe('transform', function () {
    
    it('should transform an object’s whitelisted keys', function () {
      var c = Calendar.transform({ CalendarId: '1', Name: 'Fun Times' });
      assert.equal(c._id, '1');
      assert.equal(c.name, 'Fun Times');
    });
    
    it('should exclude an object’s non-whitelisted keys', function () {
      var c = Event.transform({ CalendarId: '1', Name: 'Fun Times', RssSlug: 'http://goo.gl' });
      assert.ok(!c.RssSlug);
    });
  });
});