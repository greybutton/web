const express = require('express');
const sectors = require('./routes/sectors');

const app = express();
app.use('/sectors', sectors);

module.exports = app;
