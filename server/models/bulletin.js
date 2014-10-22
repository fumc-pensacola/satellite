var orm = require('orm');

module.exports = function (db) {
  return db.define('bulletin', {
    id: { type: 'serial', key: true },
    date: { type: 'date' },
    service: { type: 'text' },
    visible: { type: 'boolean' },
    file: { type: 'text' }
  }, {
    autoFetch: true,
    validations: {
      // date: orm.enforce.required('Date is required'),
      // service: [orm.enforce.required('Service is required'), orm.enforce.notEmptyString('Service is required')]
    }
  });
};
