var orm = require('orm');

module.exports = function (db) {
  return db.define('calendar', {
    id: { type: 'text', key: true },
    name: { type: 'text' },
    color: { type: 'text' },
    image: { type: 'text' }
  }, {
    autoFetch: true,
  });
};
