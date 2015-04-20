var mongoose = require('mongoose');

module.exports = mongoose.model('Setting', new mongoose.Schema({
  key: { type: String },
  value: { type: String }
}));
