var express = require('express');
var YAML = require('yamljs');


// Load yaml file using YAML.load
var projects = YAML.load('projects.yaml');


var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {

	console.log("someone's visiting the homepage");

	res.send('this is the HOMEPAGE');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/portfolio', function(req, res) {
	res.send(projects);
});

// showing individual project pages
projects.forEach(function(project) {
	console.log(project.slug);
	app.get('/portfolio/'+project.slug, function(req, res) {
		res.send(project);
	});
});

var server = app.listen(8000, function () {
	var port = server.address().port;

	console.log("App listening on port %s", port);
});
