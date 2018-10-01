const Command = require('../structs/Command.js');

module.exports = class EditCMDCommand extends Command {
	constructor() {
		super({
			name: 'editcmd',
			aliases: ['ec'],
			description: 'Edit a command.',
			mod: true
		});
	}

	async run(message, args) {
		const splitArgs = args.split(' ');
		const name = splitArgs.shift();
		const content = splitArgs.join(' ');

		if (!content) return message.channel.send('No content specified. Make sure you have a name and content!');

		const command = await message.client.customCommands.findOne({
			where: { name }
		});

		if (!command) return message.channel.send(`There is no command called ${name}`);

		await command.update({
			content
		});

		message.channel.send(`Edited command with name ${command.name}`);
	}
};
