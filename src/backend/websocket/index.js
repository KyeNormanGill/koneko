console.log('Websocket check');
const { Server } = require('ws');
const connections = new Map();

const wss = new Server({
	port: 1002
});

wss.on('connection', ws => {
	ws.on('message', message => {
		let parsed;
		try {
			parsed = JSON.parse(message);
		} catch (e) {
			console.log(e);
		}

		if (parsed.name === 'identification') {
			if (parsed.bearer === 'twitch') {
				connections.set('twitch', ws);
				console.log('Twitch bot identified!');
			} else if (parsed.bearer === 'web') {
				connections.set('web', ws);
				console.log('Web user identified!');
			}
		}

		if (parsed.name === 'setSong' && parsed.bearer === 'twitch') {
			const web = connections.get('web');
			if (!web) return console.log('No website loaded!');
			web.send(JSON.stringify({
				name: 'setSong',
				bearer: 'host',
				song: {
					id: parsed.song.id
				}
			}));
		}
	});
});
