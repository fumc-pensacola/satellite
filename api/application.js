var express = require('express'),
		AWS = require('aws-sdk')

module.exports = function(app) {
	app.use('/', express.static(__dirname + '/dist'));
};
