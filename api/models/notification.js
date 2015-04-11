var mongoose = require('mongoose');

module.exports = mongoose.model('Notification', new mongoose.Schema({
  sendDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  message: { type: String, required: true },
  url: { type: String },
  test: { type: Boolean }
}));
