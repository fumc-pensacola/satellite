"use strict";

let currentToken;

module.exports = {
  
  isAuthenticatedRequest: function(req) {
    let userToken = req.body.token || req.param('token') || req.headers.token;
    return userToken === currentToken;
  },

  setAuthToken: function(token) {
    currentToken = token;
  }
};
