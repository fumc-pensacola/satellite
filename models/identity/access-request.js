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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

module.exports = mongoose.models.AccessRequest || mongoose.model('AccessRequest', schema);
module.exports.ENUMS = ENUMS;
