const Command = require('../structs/Command.js');

module.exports = class ClearCommand extends Command {
	constructor() {
		super({
			name: 'clear',
			description: 'Clear the chat.',
			owner: true
		});
	}

	run(message) {
		message.channel.send('/clear');
	}
};
