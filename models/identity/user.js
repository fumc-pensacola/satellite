"use strict";

let mongoose = require('mongoose');
let scopes = require('../../utils/scopes');
let flatMap = require('lodash/flatMap');

const ENUMS = {
  SCOPES: flatMap(Object.values(scopes), Object.values)
};

let schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  twitter: String,
  facebook: String,
  email: String,
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  scopes: [{ type: String, enum: ENUMS.SCOPES }]
});

module.exports = mongoose.models.User || mongoose.model('User', schema);
