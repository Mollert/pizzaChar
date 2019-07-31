
const mysql = require("mysql");

const connection = mysql.createConnection(
	{	host: "localhost",
		port: 3306,
		user: process.env.userDB,
		password: process.env.passwordDB,
		database: process.env.databaseDB
	});

connection.connect(function(err) {
	if (err) { return next(err); }

	console.log("Database connected as id " + connection.threadId);
});

module.exports = connection;