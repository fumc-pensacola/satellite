var currentToken;

module.exports = {
  
  isAuthenticatedRequest: function (req) {
    var userToken = req.body.token || req.param('token') || req.headers.token;
    return userToken === currentToken;
  },

  setAuthToken: function (token) {
    currentToken = token;
  }
};
