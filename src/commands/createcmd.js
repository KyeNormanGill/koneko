const Command = require('../structs/Command.js');

module.exports = class CreateCMDCommand extends Command {
	constructor() {
		super({
			name: 'createcmd',
			aliases: ['cc'],
			description: 'Create a command.',
			mod: true
		});
	}

	async run(message, args) {
		const splitArgs = args.split(' ');
		const name = splitArgs.shift().toLowerCase();
		const content = splitArgs.join(' ');

		if (!content) return message.channel.send('No content specified. Make sure you have a name and content!');

		try {
			const command = await message.client.customCommands.create({
				name,
				content
			});

			// TO:DO Fail if other command has alias!

			message.channel.send(`Created command with name ${command.name}`);
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				message.channel.send('This command is already created!');
			} else {
				console.log(error);
				message.channel.send('Something isn\'t right please contact artful!');
			}
		}
	}
};
