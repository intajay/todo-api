var express = require('express');
var app = express();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var todos = [{
	id: 1,
	description: 'first todo description',
	completed: false
}, {
	id: 2,
	description: 'second todo description',
	completed: false
}, {
	id: 3,
	description: 'third todo description',
	completed: true
}];

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

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});