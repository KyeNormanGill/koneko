module.exports = client => {
	console.log('Twitch check!');
	console.time('Database sync');
	client.database.sync().then(() => console.timeEnd('Database sync'));
};
