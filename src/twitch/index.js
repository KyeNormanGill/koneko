const { username, auth, channels } = require('./config.json');

const Client = require('./structs/Client.js');
const client = new Client({ oauth: auth, username: username, channels: channels });

client.login();
