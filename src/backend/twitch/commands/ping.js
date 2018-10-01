const Command = require('../structs/Command.js');

module.exports = class PingCommand extends Command {
	constructor() {
		super({
			name: 'ping',
			description: 'Ping the bot for a response.',
			aliases: ['test'],
			owner: true
		});
	}

	run(message) {
		message.channel.send('Pong!');
	}
};
