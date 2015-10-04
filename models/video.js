"use strict";

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: { type: String, required: true },
  uri: { type: String, required: true },
  link: { type: String, required: true },
  duration: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  date: { type: Date, required: true },
  pictures: [{
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    link: { type: String, required: true }
  }],
  fileHD: { type: String, required: true },
  visible: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.models.Video || mongoose.model('Video', schema);
