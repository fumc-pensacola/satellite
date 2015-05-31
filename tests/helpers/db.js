var mongoose = require('mongoose'),
    MONGO_TEST = process.env.MONGO_TEST,
    seeds = require('./seed'),
    models = {
      Bulletin: require('../../models/bulletin'),
      Calendar: require('../../models/calendar'),
      Event: require('../../models/event'),
      Feature: require('../../models/feature'),
      Notification: require('../../models/notification'),
      Setting: require('../../models/setting'),
      Witness: require('../../models/witness')
    };

module.exports = {
  connect: function () {
    return new Promise((resolve, reject) => {
      mongoose.connect(MONGO_TEST, resolve);
    });
  },
  clear: function() {
    return Promise.all(Object.keys(models).map(m => {
      return new Promise((resolve, reject) => {
        models[m].remove({}, () => resolve());
      });
    }));
  },
  seed: function() {
    return new Promise((resolve, reject) => {
      for (var m in seeds) {
        models[m].create(seeds[m], err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }
};