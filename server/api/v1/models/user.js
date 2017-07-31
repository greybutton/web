const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Area = new Schema({
  title: {
    type: String,
    required: 'Title area is required',
  },
  score: {
    type: Number,
    min: [0, 'The value of score {VALUE} is beneath the limit {MIN}'],
    max: [10, 'The value of score {VALUE} exceeds the limit {MAX}'],
    required: 'Score area is required',
  },
  desirableScore: {
    type: Number,
    min: [0, 'The value of desirable score {VALUE} is beneath the limit {MIN}'],
    max: [10, 'The value of desirable score {VALUE} exceeds the limit {MAX}'],
    required: 'Desirable score area is required',
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
  area: {
    type: ObjectId,
    ref: 'Area',
    required: 'Area task is required',
  },
  quadrant: {
    type: String,
    required: 'Matrix quadrant is required',
  },
  label: {
    type: String,
    default: 'plain',
  },
});

const User = new Schema({
  areas: [Area],
  tasks: {
    daily: [Task],
    important: [Task],
    notImportant: [Task],
  },
});

module.exports = mongoose.model('User', User);
