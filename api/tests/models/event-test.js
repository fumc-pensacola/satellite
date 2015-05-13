require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

var assert = require('assert'),
    Event = require('../../models/event'),
    createServer = require('../helpers/server');
    db = require('../helpers/db');

describe('Event', function () {
  
  describe('scrape', function () {
    
    beforeEach(function () {
      createServer();
    });
    
    before(function () {
      db.connect();
      db.clear();
    });
    
    it('should resolve to all three pages of events', function (done) {
      Event.scrape(new Date('5/1/2015'), new Date('5/2/2015')).then(function (events) {
        assert.equal(events.length, 6);
        done();
      }, done).catch(done);
    });
    
    it('should insert events into the database', function (done) {
      Event.count({ }, function (err, count) {
        if (err) {
          return done(err);
        }
        assert.equal(count, 6);
        done();
      });
    });
    
    it('should update events on subsequent scrape', function (done) {
      Event.scrape(new Date('5/2/2015'), new Date('5/3/2015')).then(function (events) {
        assert.equal(events.length, 6);
        Event.count({ name: 'Weekend at Bernie’s' }, function (err, count) {
          if (err) {
            return done(err);
          }
          assert.equal(count, 1);
          done();
        });
      }, done).catch(done)
    })
    
  });
  
  describe('transform', function () {
    
    it('should transform an object’s whitelisted keys', function () {
      var e = Event.transform({ EventId: '1', EventName: 'Fun Times' });
      assert.equal(e._id, '1');
      assert.equal(e.name, 'Fun Times');
    });
    
    it('should exclude an object’s non-whitelisted keys', function () {
      var e = Event.transform({ EventId: '1', EventName: 'Fun Times', RssSlug: 'http://goo.gl' });
      assert.ok(!e.RssSlug);
    });
    
  });
  
});