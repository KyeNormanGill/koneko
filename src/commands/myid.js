const Command = require('../structs/Command.js');

module.exports = class PingCommand extends Command {
	constructor() {
		super({
			name: 'myid',
			description: 'Find your id.'
		});
	}

	run(message) {
		message.channel.send(`Your ID is: ${message.user.id}`);
	}
};
