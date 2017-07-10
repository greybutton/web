const express = require('express');
const sectors = require('./routes/sectors');
const tasks = require('./routes/tasks');

const app = express();
app.use('/sectors', sectors);
app.use('/tasks', tasks);

module.exports = app;
