"use strict";

let assert = require('assert');

module.exports = function(req, res, next) {
  if (!req.protected) return next();
  let requiredScope = req.requiredScopes[req.method];
  assert(requiredScope, 'Could not determine required scopes from request.');
  if (!req.token.scopes.includes(requiredScope)) {
    return res.status(403).end();
  }

  next();
}
