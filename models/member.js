"use strict";
let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  acsId: { type: Number, required: true },
  acsFamilyId: { type: Number, required: true },
  hide: { type: Boolean, required: true, default: false },
  firstName: { type: String, required: true },
  lastname: { type: String, required: true },
  title: { type: String },
  suffix: { type: String },
  goesBy: { type: String },
  isChild: { type: Boolean, required: true },
  photo: { type: String },
  emails: [{
    label: String,
    value: String
  }],
  phones: [{
    label: String,
    value: String
  }]
});

module.exports = mongoose.models.Member || mongoose.model('Member', schema);
