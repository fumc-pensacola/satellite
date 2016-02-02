"use strict";

let mongoose = require('mongoose'),
    request = require('request'),
    t = require('transducers-js');

const map = t.map,
      filter = t.filter,
      comp = t.comp,
      into = t.into;

let schema = new mongoose.Schema({
  members: { type: [mongoose.Schema.Types.ObjectId], ref: 'Member' },
  photo: String,
  addresses: [{
    label: String,
    country: String,
    company: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String
  }]
});

module.exports = mongoose.model(schema, 'Family');
