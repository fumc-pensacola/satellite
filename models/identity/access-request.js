"use strict";

let mongoose = require('mongoose');
let scopes = require('../../utils/scopes');
let flatMap = require('lodash/flatMap');

const ENUMS = {
  STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  },
  SCOPES: flatMap(Object.values(scopes), Object.values)
};

let schema = new mongoose.Schema({
  dateRequested: { type: Date, required: true, default: Date.now },
  dateSettled: Date,
  status: { type: String, enum: Object.values(ENUMS.STATUS), required: true, default: ENUMS.STATUS.PENDING },
  scopes: [{ type: String, enum: ENUMS.SCOPES }],
  digitsId: String,
  phone: String,
  twitter: String,
  facebook: String,
  email: String
});

module.exports = mongoose.models.AccessRequest || mongoose.model('AccessRequest', schema);
