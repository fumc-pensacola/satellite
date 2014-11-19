var orm = require('orm');

module.exports = function (db) {
  return db.define('feature', {
    id: { type: 'serial', key: true },
    active: { type: 'boolean' },
    iphoneFourImage: { type: 'text' },   // 640 x 734
    iphoneFiveImage: { type: 'text' },   // 640 x 910
    iphoneSixImage: { type: 'text' },    //
    iphoneSixPlusImage: { type: 'text' } //
  }, {
    autoFetch: true
  });
};
