"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  description: { type: String },
  volume: { type: Number, required: true },
  issue: { type: Number, required: true },
  visible: { type: Boolean },
  file: { type: String },
  preview: { type: String }
});

module.exports = mongoose.models.Witness || mongoose.model('Witness', schema);
