var mongoose = require('mongoose');

module.exports = {
  connect: function () {
    mongoose.connect('mongodb://localhost/mission-control-test');
  },
  clear: function () {
    mongoose.connection.db.dropDatabase();
  }
};