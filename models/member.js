"use strict";
let mongoose = require('mongoose');
let timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  acsId: { type: Number, required: true },
  acsFamilyId: { type: Number, required: true },
  hide: { type: Boolean, required: true, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String },
  suffix: { type: String },
  goesBy: { type: String },
  isChild: { type: Boolean, required: true, default: false },
  photo: { type: String },
  emails: [{
    label: String,
    value: String
  }],
  phones: [{
    label: String,
    value: String
  }],
  isDeleted: { type: Boolean, required: true, default: false },
  hash: { type: String, required: true }
});

schema.plugin(timestamps);

module.exports = mongoose.models.Member || mongoose.model('Member', schema);
