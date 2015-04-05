var orm = require('orm');

module.exports = function (db) {
  return db.define('bulletin', {
    id: { type: 'serial', key: true },
    date: { type: 'date', time: true },
    service: { type: 'text' },
    visible: { type: 'boolean' },
    file: { type: 'text' }
  }, {
    autoFetch: true,
    cache: false,
    validations: {
      // date: orm.enforce.required('Date is required'),
      // service: [orm.enforce.required('Service is required'), orm.enforce.notEmptyString('Service is required')]
    }
  });
};
