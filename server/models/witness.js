var orm = require('orm');

module.exports = function (db) {
  return db.define('witness', {
    id: { type: 'serial', key: true },
    from: { type: 'date' },
    to: { type: 'date' },
    volume: { type: 'number' },
    issue: { type: 'number' },
    visible: { type: 'boolean' },
    file: { type: 'text' }
  }, {
    autoFetch: true,
    validations: {
      from: orm.enforce.required('From date is required'),
      to: orm.enforce.required('To date is required'),
      volume: orm.enforce.required('Volume is required'),
      issue: orm.enforce.required('Issue is required')
    }
  });
};
