module.exports = client => {
	console.log('Check!');
	console.time('Database sync');
	client.database.sync().then(() => console.timeEnd('Database sync'));
};
