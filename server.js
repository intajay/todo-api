var express = require('express');
var bodyParser = require('body-parser');

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
	var matchedId;
	todos.forEach(function(todo) {
		if(todoId === todo.id) {
			matchedId = todo;
		}
	});

	if(matchedId) {
		res.json(matchedId);
	} else {
		res.status(404).send('Not Found');
	}
});

app.post('/todos', function(req, res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('Description : ' + body.description);
	res.json(body);
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});