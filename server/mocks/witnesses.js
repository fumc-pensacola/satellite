module.exports = function(app) {
  var express = require('express');
  var witnessesRouter = express.Router();
  
  var id = 9999;
  function generateSingleResponse (req) {
    return {
      "links": {
        "self": "/api/bulletins"},
        "data": {
          "date": req.body.data.date,
          "service": req.body.data.service,
          "visible": req.body.data.visible,
          "file": null,
          "id": ++id,
          "type": "bulletins",
          "links": {"self":"/api/bulletins/" + id }
        }
    };
  }

  witnessesRouter.get('/', function(req, res) {
    res.send({
      "links": {
        "self": "/api/witnesses",
      },
      "data": [{"id":12,"from":"2015-03-29T07:00:00.000Z","to":"2015-04-11T07:00:00.000Z","volume":195,"issue":7,"visible":true,"file":"03-29-15_Witness.pdf"}]
    });
  });

  witnessesRouter.post('/', function(req, res) {
    res.status(201).send(generateSingleResponse(req));
  });

  witnessesRouter.patch('/:id', function(req, res) {
    res.send(generateSingleResponse(req));
  });

  witnessesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/witnesses', witnessesRouter);
};
