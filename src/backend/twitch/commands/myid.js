const Command = require('../structs/Command.js');

module.exports = class MyIdCommand extends Command {
	constructor() {
		super({
			name: 'myid',
			description: 'Find your id.',
			owner: true
		});
	}

	run(message) {
		message.channel.send(`Your ID is: ${message.user.id}`);
	}
};
