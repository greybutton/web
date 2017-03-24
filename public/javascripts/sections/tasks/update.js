var taskShow = require('./show');
var empty = require('./empty');

module.exports = function (json) {

  empty();
  taskShow(json);

};
