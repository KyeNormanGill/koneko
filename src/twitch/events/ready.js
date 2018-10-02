const { auth } = require('../config.json');
const { get } = require('snekfetch');

module.exports = async client => {
	console.log('Check!');
	console.time('Database sync');
	client.database.sync().then(() => console.timeEnd('Database sync'));

	const { body } = await get('https://id.twitch.tv/oauth2/validate', { headers: { Authorization: `OAuth ${auth.replace('oauth:', '')}` } }).catch(console.log);
	client.clientID = body.client_id;
};
