var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Sector = new Schema({
  title: String,
  score: Number,
  desirableScore: Number
});

var Task = new Schema({
  text: String,
  time: String,
  sector: {
    type: ObjectId,
    ref: 'Sector'
  },
  matrixQuater: String,
  label: {
    type: String,
    default: 'plain'
  }
});

var User = new Schema({
  sectors: [Sector],
  tasks: {
    daily: [Task],
    important: [Task],
    notImportant: [Task]
  }
});

module.exports = mongoose.model('User', User);
