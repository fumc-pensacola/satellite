"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  date: { type: Date, required: true },
  service: { type: String, required: true },
  description: { type: String },
  liturgicalDay: { type: String, required: true },
  visible: { type: Boolean },
  file: { type: String },
  preview: { type: String }
});

module.exports = mongoose.models.Bulletin || mongoose.model('Bulletin', schema);
