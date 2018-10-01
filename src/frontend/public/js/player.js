/* eslint-disable */
const tag = document.createElement('script');
const websocket = new WebSocket('ws://localhost:1002');
let started = false;

// Connection opened
websocket.onopen = () => {
	websocket.send(JSON.stringify({
		name: 'identification',
		bearer: 'web'
	}));
}

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640'
	});
}

// Listen for messages
websocket.addEventListener('message', event => {
	let parsed;
	try {
		parsed = JSON.parse(event.data);
	} catch (e) {
		return console.log(e);
	}

	if (parsed.name === 'setSong') {
		player.loadVideoById(parsed.song.id);
		player.playVideo();
	}
});

const stop = document.getElementById('stop-btn').addEventListener('click', () => {
	player.stopVideo();
});

const pause = document.getElementById('pause-btn').addEventListener('click', () => {
	player.pauseVideo();
});

const play = document.getElementById('play-btn').addEventListener('click', () => {
	player.playVideo();
});