module.exports = class Command {
	constructor(options = {}) {
		if (!options.description) throw Error('No description detected in command.');
		if (!options.name) throw Error('No name property detected in command.');
		if (!options.owner) options.owner = false;
		if (!options.mod) options.mod = false;
		if (!options.aliases) options.aliases = [];

		this.name = options.name;
		this.description = options.description;
		this.owner = options.owner;
		this.aliases = options.aliases;
	}
};
