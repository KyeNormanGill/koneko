const express = require('express');
const app = express();
const { resolve } = require('path');

app.use(express.static(resolve(__dirname, 'public')));

app.listen(1001);

console.log('Site check');
