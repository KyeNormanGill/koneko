const { spawn } = require('child_process');
const { resolve } = require('path');
const opener = require('opener');
const processes = [
	resolve(__dirname, 'backend', 'twitch', 'index.js'),
	resolve(__dirname, 'backend', 'websocket', 'index.js'),
	resolve(__dirname, 'frontend', 'index.js')
];

function start(args) {
	const child = spawn('node', [args]);

	child.on('exit', () => console.log('closed'));

	child.stdout.on('data', data => console.log(String(data)));

	child.stderr.on('data', data => console.error(String(data)));

	child.on('close', () => setTimeout(() => { start(args); }, 1000 * 30));
}

for (const proc in processes) {
	start(processes[proc]);
}

opener('http://localhost:1001');
