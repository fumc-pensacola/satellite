var orm = require('orm');

module.exports = function (db) {
  return db.define('setting', {
    id: { type: 'serial', key: true },
    key: { type: 'text' },
    value: { type: 'text' }
  }, {
    autoFetch: true
  });
};
