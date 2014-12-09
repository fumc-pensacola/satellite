var orm = require('orm');

module.exports = function (db) {
  return db.define('notification', {
    id: { type: 'serial', key: true },
    sendDate: { type: 'date', time: true },
    expirationDate: { type: 'date', time: true },
    message: { type: 'text' },
    url: { type: 'text' },
    test: { type: 'boolean', required: true }
  }, {
    autoFetch: true,
    validations: {
      sendDate: orm.enforce.required('sendDate is required'),
      expirationDate: orm.enforce.required('expirationDate is required'),
      message: orm.enforce.required('message is required')
    }
  });
};
