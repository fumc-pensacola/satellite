var mongoose = require('mongoose');

module.exports = mongoose.model('Calendar', new mongoose.Schema({
  _id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  color: { type: String },
  image: { type: String }
}));
