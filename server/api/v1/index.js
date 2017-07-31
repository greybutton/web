const express = require('express');
const areas = require('./routes/areas');
const tasks = require('./routes/tasks');

const app = express();
app.use('/areas', areas);
app.use('/tasks', tasks);

module.exports = app;
