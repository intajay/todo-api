var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

if (env == 'production') {
	sequelize = new Sequelize('todo', 'adminmsiau9a', 'EfwkW_LZ3B_2', {
		host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST || '127.0.0.1',
		port: process.env.OPENSHIFT_POSTGRESQL_DB_PORT || 3000,
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		dialect: 'sqlite',
		storage: __dirname + '/data/db.sqlite'
	});
}

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;