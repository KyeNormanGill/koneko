const Sequelize = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	storage: 'commands.sqlite'
});

sequelize.import(join(__dirname, '..', 'models', 'commands'));

module.exports = sequelize;
