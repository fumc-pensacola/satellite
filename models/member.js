"use strict";
let mongoose = require('mongoose');

let schema = new mongoose.Schema({
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
