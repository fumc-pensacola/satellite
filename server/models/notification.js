var orm = require('orm');

module.exports = function (db) {
  return db.define('notification', {
    id: { type: 'serial', key: true },
    sendDate: { type: 'date', time: true },
    expirationDate: { type: 'date' },
    message: { type: 'text' },
    url: { type: 'text' }
  }, {
    autoFetch: true
  });
};
