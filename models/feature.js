"use strict";

let mongoose = require('mongoose');

module.exports = mongoose.model('Feature', new mongoose.Schema({
  active: { type: Boolean },
  url: { type: String },
  iphoneFourImage: { type: String },   //  640 x 734
  iphoneFiveImage: { type: String },   //  640 x 910
  iphoneSixImage: { type: String },    //  750 x 1108
  iphoneSixPlusImage: { type: String } // 1242 x 1869
}));