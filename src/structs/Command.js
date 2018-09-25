module.exports = class Command {
	constructor(options = {}) {
		if (!options.description) throw Error('No description detected in command.');
		if (!options.name) throw Error('No name property detected in command.');
		if (!options.aliases) options.aliases = [];
		if (!options.owner) options.owner = false;
		if (!options.mod) options.mod = false;

		this.description = options.description;
		this.aliases = options.aliases;
		this.owner = options.owner;
		this.name = options.name;
		this.mod = options.mod;
	}
};
