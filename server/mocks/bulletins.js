module.exports = function(app) {
  var express = require('express');
  var bulletinsRouter = express.Router();
  
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

  bulletinsRouter.get('/', function(req, res) {
    res.send({
      "links": {
        "self":"/api/bulletins"
      },
      "data": [{"id":18,"date":"2015-04-05T07:00:00.000Z","service":"Traditional services","visible":true,"file":"04-05-15_bulletin.pdf","type":"bulletins","links":{"self":"/api/bulletins/18"}},{"id":17,"date":"2015-04-05T07:00:00.000Z","service":"ICON","visible":true,"file":"Easter_ICON.pdf","type":"bulletins","links":{"self":"/api/bulletins/17"}}]
    });
  });

  bulletinsRouter.post('/', function(req, res) {
    res.status(201).send(generateSingleResponse(req));
  });

  bulletinsRouter.patch('/:id', function(req, res) {
    console.log(req.body);
    res.send(generateSingleResponse(req));
  });

  bulletinsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/bulletins', bulletinsRouter);
};
