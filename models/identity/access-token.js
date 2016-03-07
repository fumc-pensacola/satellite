"use strict";

let mongoose = require('mongoose');
let scopes = require('../../utils/scopes');
let flatMap = require('lodash/flatMap');

const ENUMS = {
  SCOPES: flatMap(Object.values(scopes), Object.values)
};

let schema = new mongoose.Schema({
  issuedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, required: true, default: false },
  scopes: [{ type: String, enum: ENUMS.SCOPES }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.models.AccessToken || mongoose.model('AccessToken', schema);
