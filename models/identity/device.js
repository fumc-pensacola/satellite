"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  uuid: { type: String, required: true },
  type: { type: String, required: true },
  publicKey: { type: String, required: true },
  dateAuthorized: { type: Date, required: true },
  lastSeen: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.models.Device || mongoose.model('Device', schema);
