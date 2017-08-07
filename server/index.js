const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiV1 = require('./api/v1');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/laura', {
  useMongoClient: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.use('/api/v1', apiV1);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

// for testing
module.exports = app;
