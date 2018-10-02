const express = require('express');
const app = express();
const { resolve } = require('path');
const opener = require('opener');

app.use(express.static(resolve(__dirname, 'public')));

app.listen(1001);

opener('http://localhost:1001');

console.log('Check');
