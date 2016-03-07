"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  twitter: String,
  facebook: String,
  email: String,
  digitsId: String,
  phone: String,
  currentToken: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessToken' },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
});

module.exports = mongoose.models.User || mongoose.model('User', schema);
