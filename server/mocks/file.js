module.exports = function(app) {
  var express = require('express');
  var fileRouter = express.Router();
  var getFile = require('../../api/controllers/file')._get;
  
  fileRouter.get('/:key', getFile);

  app.use('/api/file', fileRouter);
};
