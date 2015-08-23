"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  sendDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  message: { type: String, required: true },
  url: { type: String },
  test: { type: Boolean }
});

module.exports = mongoose.models.Notification || mongoose.model('Notification', schema);
