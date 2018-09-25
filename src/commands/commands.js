const Command = require('../structs/Command.js');

module.exports = class AllCMDCommand extends Command {
	constructor() {
		super({
			name: 'commands',
			aliases: ['ac'],
			description: 'Edit a command.'
		});
	}

	async run(message) {
		const commands = await message.client.customCommands.findAll();
		message.channel.send(`Commands: ${commands.map(c => c.name)}`);
	}
};
