module.exports = function(app) {
  var express = require('express');
  var witnessesRouter = express.Router();

  witnessesRouter.get('/', function(req, res) {
    res.send([{"id":12,"from":"2015-03-29T07:00:00.000Z","to":"2015-04-11T07:00:00.000Z","volume":195,"issue":7,"visible":true,"file":"03-29-15_Witness.pdf"}]);
  });

  witnessesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  witnessesRouter.get('/:id', function(req, res) {
    res.send({
      'witnesses': {
        id: req.params.id
      }
    });
  });

  witnessesRouter.put('/:id', function(req, res) {
    res.send({
      'witnesses': {
        id: req.params.id
      }
    });
  });

  witnessesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/witnesses', witnessesRouter);
};
