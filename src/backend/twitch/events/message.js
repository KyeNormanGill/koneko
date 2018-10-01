module.exports = async(client, message) => {
	const { prefix } = message.client;

	if (!message.content.startsWith(prefix)) return;

	const commandName = message.content.slice(prefix.length).split(' ')[0].toLowerCase();

	const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		const customCommand = await client.customCommands.findOne({ where: { name: commandName } });
		if (!customCommand) return;
		if (customCommand.mod && !message.user.moderator) {
			if (message.client.owner !== message.user.id) return;
		}
		return message.channel.send(customCommand.content);
	}

	if (command.mod && !message.user.moderator) {
		if (message.client.owner !== message.user.id) return;
	}

	if (command.owner && message.client.owner !== message.user.id) return;

	const args = message.content.split(' ').slice(1).join(' ');

	try {
		command.run(message, args);
	} catch (err) {
		console.error(err);
		message.channel.send(`An error occured while trying to run ${command.name}.${err.name}: ${err.message}. \nPlease contact: Artful`);
	}
};
