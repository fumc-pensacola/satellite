module.exports = function(app) {
  var express = require('express');
  var bulletinsRouter = express.Router();

  bulletinsRouter.get('/', function(req, res) {
    res.send({
      "links": {
        "self":"/api/bulletins"
      },
      "data": [{"id":18,"date":"2015-04-05T07:00:00.000Z","service":"Traditional services","visible":true,"file":"04-05-15_bulletin.pdf"},{"id":17,"date":"2015-04-05T07:00:00.000Z","service":"ICON","visible":true,"file":"Easter_ICON.pdf"}]
    });
  });

  bulletinsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  bulletinsRouter.get('/:id', function(req, res) {
    res.send({
      'bulletins': {
        id: req.params.id
      }
    });
  });

  bulletinsRouter.put('/:id', function(req, res) {
    res.send({
      'bulletins': {
        id: req.params.id
      }
    });
  });

  bulletinsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/bulletins', bulletinsRouter);
};
