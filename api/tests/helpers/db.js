var mongoose = require('mongoose');

module.exports = {
  connect: function () {
    return new Promise(function (resolve, reject) {
      mongoose.connect('mongodb://localhost/mission-control-test', resolve);
    });
  },
  clear: function () {
    mongoose.connection.db.dropDatabase();
  },
  disconnect: function () {
    mongoose.disconnect();
    console.log('Disconnecting');
  }
};