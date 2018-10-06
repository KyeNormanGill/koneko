/* eslint-disable */
const tag = document.createElement('script');
const websocket = new WebSocket('ws://localhost:1002');
let started = false;
let player;

const app = new Vue({
	el: '.main',
	data: {
		message: 'hello world',
		currSongName: 'Waiting...',
		currSongChannel: 'Waiting...',
		currSongDuration: 'Waiting...',
		songs: [],
		messages: []
	},
	methods: {
		play() {
			player.playVideo();
		},
		skip() {
			// todo
		},
		pause() {
			player.pauseVideo();
		}
	}
});

websocket.onopen = () => {
	websocket.send(JSON.stringify({
		name: 'identification',
		bearer: 'web'
	}));
}

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '300px',
		width: '100%',
		playerVars: { 'disablekb': 1 }
	});
}

websocket.addEventListener('message', event => {
	let parsed;
	try {
		parsed = JSON.parse(event.data);
	} catch (e) {
		return console.log(e);
	}

	if (parsed.name === 'setSong') {
		app.songs.push(parsed.song);
		app.currSongName = parsed.song.name;
		app.currSongChannel = parsed.song.channel;
		app.currSongDuration = parsed.song.duration;
		player.loadVideoById(parsed.song.id);
		player.playVideo();
	}
});


