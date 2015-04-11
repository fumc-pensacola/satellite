var mongoose = require('mongoose');

module.exports = mongoose.model('Bulletin', new mongoose.Schema({
  date: { type: Date, required: true },
  service: { type: String, required: true },
  visible: Boolean,
  file: String
}));