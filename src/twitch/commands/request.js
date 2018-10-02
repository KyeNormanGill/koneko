const Command = require('../structs/Command.js');

module.exports = class RequestCommand extends Command {
	constructor() {
		super({
			name: 'request',
			description: 'Request a song to play.',
			aliases: ['rs']
		});
	}

	async run(message, args) {
		console.log('rs');
		const baseData = await message.client.youtube.searchVideos(args, 1);
		if (!baseData.length) return message.channel.send(`Could not find a song with name: ${args}`);

		const vidData = await message.client.youtube.getVideoByID(baseData[0].id);
		if (!vidData) return message.channel.send('There was a problem with the youtube api!');

		console.log('sending song');
		message.client.baseWS.send(JSON.stringify({
			name: 'setSong',
			song: {
				id: vidData.id
			},
			bearer: 'twitch'
		}));
	}
};
