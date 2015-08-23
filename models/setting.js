"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  key: { type: String },
  value: { type: String }
});

module.exports = mongoose.models.Setting || mongoose.model('Setting', schema);
