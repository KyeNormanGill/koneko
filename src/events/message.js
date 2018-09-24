module.exports = (client, message) => {
	console.log(message);
	const { prefix } = message.client;

	if (!message.content.startsWith(prefix)) return;

	const commandName = message.content.slice(prefix.length).split(' ')[0].toLowerCase();

	const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return console.log('no command');
	if (command.owner && message.client.owner !== message.user.id) return console.log('Not owner');

	const args = message.content.split(' ').slice(1).join(' ');

	try {
		command.run(message, args);
	} catch (err) {
		console.error(err);
		message.channel.send(`An error occured while trying to run ${command.name}.${err.name}: ${err.message}. \nPlease contact: Artful`);
	}
};
