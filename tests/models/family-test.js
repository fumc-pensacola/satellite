"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env.test') }); } catch (e) {} // eslint-disable-line

let assert = require('assert'),
    server = require('../helpers/server'),
    db = require('../helpers/db'),
    Family = require('../../models/family'),
    Member = require('../../models/member');

describe('Family', function() {
  this.timeout(3000);
  
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
    
    it('gets all pages of all letters and saves them as Members within Families', done => {
      Family.scrape().then(() => {
        Family.find({}, (err, families) => {
          if (err) return done(err);
          assert.equal(families.length, 4);
          assert.ok(families.every(f => f.members.length === 1));
          done();
        });
      }).catch(done);
    })
  });
});
