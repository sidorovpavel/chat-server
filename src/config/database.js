var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	process.env.DBNAME||'chat_sb',
	process.env.DBUSER||'chat_user',
	process.env.DBPASS||'chat_user_123',
	{
	dialect: 'mysql',
	host: process.env.DBHOST||'localhost',
	pool: {
		max: 5,
		min: 0,
		require: 30000,
		idle: 1000,
	},
	logging: false,
	port: process.env.DBPORT||3306,
	define: {
		timestamp: false,
		charset: 'utf8',
		collate: 'utf8_general_ci',
		dialectOptions: {
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	},
	dialectOptions: {
		charset: 'utf8',
		collate: 'utf8_general_ci',
	}
});
sequelize.query("SET NAMES utf8;");

module.exports = sequelize;
