var Sequelize = require('sequelize');

var sequelize = new Sequelize('chat_sb', 'chat_user', 'chat_user_123', {
	dialect: 'mysql',
	host: 'localhost',
	pool: {
		max: 5,
		min: 0,
		require: 30000,
		idle: 1000,
	},
	logging: false,
	port: 3306,
	define: {
		timestamp: false
	}
});

module.exports = sequelize;