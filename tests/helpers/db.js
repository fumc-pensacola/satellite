"use strict";

let mongoose = require('mongoose'),
    seeds = require('./seed'),
    models = {
      Bulletin: require('../../models/bulletin'),
      Calendar: require('../../models/calendar'),
      Event: require('../../models/event'),
      Feature: require('../../models/feature'),
      Notification: require('../../models/notification'),
      Setting: require('../../models/setting'),
      Witness: require('../../models/witness'),
      Member: require('../../models/member')
    };
    
const MONGO_TEST = process.env.MONGO_TEST;

module.exports = {
  connect: function() {
    return new Promise((resolve, reject) => {
      mongoose.connect(MONGO_TEST, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
  disconnect: function() {
    return new Promise((resolve, reject) => {
      mongoose.disconnect(resolve);
    });
  },
  clear: function() {
    return Promise.all(Object.keys(models).map(m => {
      return new Promise((resolve, reject) => {
        models[m].remove({}, err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }));
  },
  seed: function() {
    return Promise.all(Object.keys(seeds).map(m => {
      return new Promise((resolve, reject) => {
        models[m].create(seeds[m], err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }));
  }
};