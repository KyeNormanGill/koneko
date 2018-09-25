const Command = require('../structs/Command.js');

module.exports = class RemoveCMDCommand extends Command {
	constructor() {
		super({
			name: 'removecmd',
			aliases: ['rc'],
			description: 'Remove a command.',
			mod: true
		});
	}

	async run(message, args) {
		const command = await message.client.customCommands.findOne({ where: { name: args } });

		if (!command) return message.channel.send('This command doesn\'t exist!');

		await command.destroy();

		message.channel.send(`Deleted command with name ${command.name}`);
	}
};
