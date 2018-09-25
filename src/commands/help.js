const Command = require('../structs/Command.js');

module.exports = class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			aliases: ['helpme'],
			description: 'Help command.'
		});
	}

	run(message, args) {
		if (!args) {
			let text = 'Commands: ';
			for (const [, value] of message.client.commands.entries()) {
				if (value.mod && !message.user.moderator) continue;
				if (value.owner && message.client.owner !== message.user.id) continue;
				text += `${value.name}, `;
			}
			message.channel.send(text);
		} else {
			// TO:DO Add alias finding.
			const command = message.client.commands.get(args);
			if (!command) return message.channel.send(`No command found with the name ${args}`);
			message.channel.send(`${command.name}: ${command.description}`);
		}
	}
};
