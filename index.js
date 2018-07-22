var express = require('express');
var morgan = require('morgan');
var path = require('path');
var config = require('./config/config');

var app = express();

// use morgan to see the web requests
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '/html')));
app.use('/', function(req, res, next) {
	console.log('in function');
	console.log(__dirname+'./html/index.html');

	res.sendFile(path.join(__dirname+'/html/index.html'));
});

// global error handling
app.use(function(err, req, res, next) {
	res.type('json');
	res.status(400).send({
		'error': 'something went wrong.'
	});
});

app.listen(config.port, function() {
	console.log('Node app is running on port', config.port);
})