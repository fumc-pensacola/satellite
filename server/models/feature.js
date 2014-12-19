var orm = require('orm');

module.exports = function (db) {
  return db.define('feature', {
    id: { type: 'serial', key: true },
    active: { type: 'boolean' },
    url: { type: 'text' },
    iphoneFourImage: { type: 'text' },   //  640 x 734
    iphoneFiveImage: { type: 'text' },   //  640 x 910
    iphoneSixImage: { type: 'text' },    //  750 x 1108
    iphoneSixPlusImage: { type: 'text' } // 1242 x 1869
  }, {
    autoFetch: true
  });
};
