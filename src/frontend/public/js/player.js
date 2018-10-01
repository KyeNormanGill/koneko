/* eslint-disable */
const tag = document.createElement('script');
const websocket = new WebSocket('ws://localhost:1002');
let started = false;

// Connection opened
websocket.addEventListener('open', () => {
    websocket.send(JSON.stringify({
		name: 'identification',
		bearer: 'web'
	}));
});

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		events: {
			'onStateChange': onPlayerStateChange
		}
	});
}

// Listen for messages
websocket.addEventListener('message', event => {
	const parsed = JSON.parse(event.data);
	if (parsed.name === 'setSong') {
		player.loadVideoById(parsed.song.id);
		player.playVideo();
	}
});