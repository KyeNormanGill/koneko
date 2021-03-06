const YouTube = require('simple-youtube-api');
const { Client } = require('javelin');
const { promisify } = require('util');
const { ytToken } = require('../config.json');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);

module.exports = class Koneko extends Client {
	constructor(options = {}) {
		super(options);
		this.prefix = '>';
		this.owner = 52960823;
		this.commands = new Map();
		this.database = require('./Database.js');
		this.customCommands = this.database.import('../models/commands.js');
		this.baseWS = new WebSocket('ws://localhost:1002');
		this.youtube = new YouTube(ytToken);
		this.clientID = null;

		this.baseWS.on('open', () => {
			console.log('Connected to baseWS');
			this.baseWS.send(JSON.stringify({ name: 'identification', bearer: 'twitch' }));
		});
		this.initEvents();
		this.initCommands();
	}

	async initEvents() {
		const dir = path.resolve(__dirname, '..', 'events');
		const events = await readdir(dir);

		for (const event of events) {
			this.on(event.replace('.js', ''), (...args) => require(path.resolve(dir, event))(this, ...args));
		}

		this.emit('debug', `Loaded ${events.length} events!`);
	}

	async initCommands() {
		const dir = path.resolve(__dirname, '..', 'commands');
		const commands = await readdir(dir);

		for (const command of commands) {
			const Command = require(path.join(dir, command));
			const cmd = new Command();

			this.commands.set(cmd.name, cmd);
		}

		this.emit('debug', `Loaded ${commands.length} commands!`);
	}
};
