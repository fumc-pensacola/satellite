"use strict";

let mongoose = require('mongoose');

module.exports = mongoose.model('Witness', new mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  volume: { type: Number, required: true },
  issue: { type: Number, required: true },
  visible: { type: Boolean },
  file: { type: String }
}));