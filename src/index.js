const { spawn } = require('child_process');
const { resolve } = require('path');
const processes = [
	['Twitch', resolve(__dirname, 'twitch', 'index.js')],
	['Websocket', resolve(__dirname, 'websocket', 'index.js')],
	['Website', resolve(__dirname, 'site', 'index.js')]
];

function start(args) {
	const child = spawn('node', [args[1]]);

	child.on('exit', () => console.log(`${args[0]}: Exited`));

	child.stdout.on('data', data => console.log(`${args[0]}: ${data}`));

	child.stderr.on('data', data => console.log(`${args[0]}: ${data}`));

	child.on('close', () => setTimeout(() => { start(args); }, 1000 * 30));
}

for (const proc in processes) {
	start(processes[proc]);
}
