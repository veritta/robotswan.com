var express = require('express');
var YAML = require('yamljs');
var nunjucks = require('nunjucks');
var marked = require('marked');


// Load yaml file using YAML.load
var projects = YAML.load('data/projects.yaml');
var pages = YAML.load('data/pages.yaml');

// runs express function to create express app
var app = express();

// nunjucks stuff
var env = nunjucks.configure('views', {
	express: app,
	noCache: true
});
env.addFilter('markdown', function(str) {
	return new nunjucks.runtime.SafeString(marked(str));
});

// Disable cache
app.set('view cache', false);

// make PUBLIC folder assets accessible by client
app.use(express.static('public'));

// show HOME
app.get('/', function(req, res) {
	res.render('home.nunjucks');
});

// show PORTFOLIO
app.get('/portfolio', function(req, res) {
	res.render('portfolio.nunjucks', {'projects': projects});
});

// show PORTFOLIO ITEM
projects.forEach(function(project) {
	app.get('/portfolio/'+project.slug, function(req, res) {
		res.render('portfolio-item.nunjucks', {'project': project});
	});
});

// show PAGE
pages.forEach(function(page) {
	app.get('/'+page.slug, function(req, res) {
		res.render('page.nunjucks', {'page': page});
	});
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function () {
	var port = server.address().port;

	console.log("App listening on port %s", port);
});
