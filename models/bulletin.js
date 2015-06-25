"use strict";

let mongoose = require('mongoose');

module.exports = mongoose.model('Bulletin', new mongoose.Schema({
  date: { type: Date, required: true },
  service: { type: String, required: true },
  lectionary: { type: String },
  liturgicalDay: { type: String, required: true },
  visible: { type: Boolean },
  file: { type: String },
  preview: { type: String }
}));