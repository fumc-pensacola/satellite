var mongoose = require('mongoose');

module.exports = mongoose.model('Calendar', new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  image: { type: String }
}));
