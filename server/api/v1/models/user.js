const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Sector = new Schema({
  title: {
    type: String,
    required: 'Title sector is required',
  },
  score: {
    type: Number,
    required: 'Score sector is required',
  },
  desirableScore: {
    type: Number,
    required: 'Desirable score sector is required',
  },
});

const Task = new Schema({
  text: {
    type: String,
    required: 'Text task is required',
  },
  time: {
    type: String,
    required: 'Time task is required',
  },
  sector: {
    type: ObjectId,
    ref: 'Sector',
    required: 'Sector task is required',
  },
  matrixQuarter: {
    type: String,
    required: 'Matrix quater is required',
  },
  label: {
    type: String,
    default: 'plain',
  },
});

const User = new Schema({
  sectors: [Sector],
  tasks: {
    daily: [Task],
    important: [Task],
    notImportant: [Task],
  },
});

module.exports = mongoose.model('User', User);
