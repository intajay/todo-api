var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Todo app!');
});

app.get('/todos', function(req, res) {
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
	// Convert req.params.id string into number
	var todoId = parseInt(req.params.id, 10);
	var matchedId = _.findWhere(todos, {id: todoId});

	if(matchedId) {
		res.json(matchedId);
	} else {
		res.status(404).send('404');
	}
});

app.post('/todos', function(req, res) {
	body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send(400);
	}

	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	console.log('Description : ' + body.description);
	res.json(body);
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});