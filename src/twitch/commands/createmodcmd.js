const Command = require('../structs/Command.js');

module.exports = class CreateModCMDCommand extends Command {
	constructor() {
		super({
			name: 'createmodcmd',
			aliases: ['cmc'],
			description: 'Create a command for mods only.',
			mod: true
		});
	}

	async run(message, args) {
		const splitArgs = args.split(' ');
		const name = splitArgs.shift().toLowerCase();
		const content = splitArgs.join(' ');

		if (!content) return message.channel.send('No content specified. Make sure you have a name and content!');

		const existingCommand = message.client.commands.get(name)
				|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

		if (existingCommand) return message.channel.send(`There is already a command with the name ${name}`);

		try {
			const command = await message.client.customCommands.create({
				name,
				content,
				mod: true
			});

			message.channel.send(`Created mod only command with name ${command.name}`);
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
