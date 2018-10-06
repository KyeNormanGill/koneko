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

		const payload = {
			name: 'setSong',
			song: {
				id: vidData.id,
				name: vidData.title,
				channel: vidData.channel.title,
				length: vidData.duration
			},
			bearer: 'twitch'
		};

		console.log(payload);

		message.client.baseWS.send(JSON.stringify(payload));
	}
};
