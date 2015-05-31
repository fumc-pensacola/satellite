"use strict";

let express = require('express');

module.exports = function(app) {
  app.use('/', express.static('./dist'));
};
