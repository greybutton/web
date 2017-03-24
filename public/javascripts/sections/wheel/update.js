var showWheel = require('./show');
var empty = require('./empty');

module.exports = function (json) {

  empty();
  showWheel(json);

};
