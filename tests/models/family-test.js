"use strict";

try { require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env.test') }); } catch (e) {} // eslint-disable-line

let assert = require('assert'),
    server = require('../helpers/server'),
    db = require('../helpers/db'),
    Family = require('../../models/family'),
    Member = require('../../models/member');

describe('Family', function() {
  this.timeout(5000);
  
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
    
    let preUpdateMary, preUpdateAndrew;
    it('gets all pages of all letters and saves them as Members within Families', done => {
      Family.scrape().then(() => {
        Family.find({}).populate('members').exec((err, families) => {
          if (err) return done(err);
          preUpdateMary = families.find(f => f.members[0].lastName === 'Algore').members[0];
          preUpdateAndrew = families.find(f => f.members[0].lastName === 'Branch').members[0];
          assert.equal(families.length, 4);
          assert.ok(families.every(f => f.members.length === 1));
          done();
        });
      }).catch(done);
    });
    
    it('excludes members whose emails and phones are all marked unlisted', done => {
      Member.count({ firstName: 'Unlisted' }, (err, count) => {
        if (err) return done(err);
        assert.equal(count, 0);
        done();
      });
    });
    
    it('updates a member', done => {
      Family.scrape().then(() => {
        Member.findOne({ acsId: 70 }, (err, postUpdateAndrew) => {
          if (err) return done(err);
          assert.notEqual(preUpdateAndrew.hash, postUpdateAndrew.hash);
          assert.notEqual(preUpdateAndrew.updatedAt.getTime(), postUpdateAndrew.updatedAt.getTime());
          assert.equal(postUpdateAndrew.phones.length, 1);
          assert.equal(postUpdateAndrew.phones[0].value, '+18501234567');
          done();
        });
      });
    });
    
    it('soft-deletes a removed or newly unlisted member', done => {
      Family.scrape().then(() => {
        Member.find({ isDeleted: true }, (err, members) => {
          if (err) return done(err);
          assert.equal(members.length, 1);
          assert.equal(members[0].lastName, 'Zanzibar');
          done();
        });
      });
    });
    
    it.skip('soft-deletes families with no non-deleted members');
    
    it('does not update updatedAt if there were no changes to a member', done => {
      Member.findOne({ lastName: 'Algore' }, (err, postUpdateMary) => {
        if (err) return done(err);
        assert.equal(preUpdateMary.hash, postUpdateMary.hash);
        assert.equal(preUpdateMary.updatedAt.getTime(), postUpdateMary.updatedAt.getTime());
        done();
      });
    });
  });
});
