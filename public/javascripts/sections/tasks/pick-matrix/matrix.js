var first = require('./first');
var second = require('./second');
var third = require('./third');
var fourth = require('./fourth');

module.exports = function (quater) {
  if (quater === 'first') {
    return first();
  }

  if (quater === 'second') {
    return second();
  }

  if (quater === 'third') {
    return third();
  }

  if (quater === 'fourth') {
    return fourth();
  }
};
