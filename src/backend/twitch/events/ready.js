const DB = require('../structs/Database.js');

module.exports = client => {
	console.log('Logged in!');
	console.time('Database sync');
	client.database.sync().then(() => console.timeEnd('Database sync'));
};
