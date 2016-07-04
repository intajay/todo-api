var Sequelize = require('sequelize');
//var env = process.env.OPENSHIFT_ENV_VAR || 'development';

//console.log(process.env.OPENSHIFT_ENV_VAR);

// connection_string = '://127.0.0.1:3000/' + todo;
// if (process.env.OPENSHIFT_POSTGRESQL_DB_URL) {
// 	connection_string = process.env.OPENSHIFT_POSTGRESQL_DB_URL + todo;
// }

var sequelize = new Sequelize('todo', 'adminwhlmkm7', 'dthVplJ6Hqfr', {
		host: 'localhost',
		port: 3000,
		dialect: 'postgresql'
	});

// if (env == 'production') {
// 	sequelize = new Sequelize('todo', 'adminwhlmkm7', 'dthVplJ6Hqfr', {
// 		host: 'localhost',
// 		port: 3000,
// 		dialect: 'postgresql'
// 	});
// } else {
// 	sequelize = new Sequelize(undefined, undefined, undefined, {
// 		dialect: 'sqlite',
// 		storage: __dirname + '/data/db.sqlite'
// 	});
// }

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;