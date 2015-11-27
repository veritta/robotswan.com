var express = require('express');
var YAML = require('yamljs');
var swig = require('swig');

// Load yaml file using YAML.load
var projects = YAML.load('data/projects.yaml');
var pages = YAML.load('data/pages.yaml');

// runs express function to create express app
var app = express();

// add swig to app
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/views');

// Disable cache
app.set('view cache', false);
swig.setDefaults({ cache: false });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	res.send('this is the HOMEPAGE');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/portfolio', function(req, res) {
	res.render('portfolio.swig', {projects: projects});
});

// showing individual projects
projects.forEach(function(project) {
	app.get('/portfolio/'+project.slug, function(req, res) {
		res.send(project);
	});
});

// showing individual pages
pages.forEach(function(page) {
	app.get('/'+page.slug, function(req, res) {
		res.send(page);
	});
});

var server = app.listen(8000, function () {
	var port = server.address().port;

	console.log("App listening on port %s", port);
});
