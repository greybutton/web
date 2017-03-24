var taskAdd = require('./tasks/add');
var taskEdit = require('./tasks/edit');
var taskEditCancel = require('./tasks/edit-cancel');
var taskEditSave = require('./tasks/edit-save');
var taskDelete = require('./tasks/delete');

var task = {};

task.add = function (event) {
  return taskAdd(event);
};

task.edit = function (event) {
  return taskEdit(event);
};

task.editCancel = function (event) {
  return taskEditCancel(event);
};

task.editSave = function (event) {
  return taskEditSave(event);
};

task.delete = function (event) {
  return taskDelete(event);
};

module.exports = task;
