var toggle = require('./toggle');

module.exports = function () {
  $('.js-wheel,' +
    '.js-tasks,' +
    '.js-daily-tasks,' +
    '.js-table').off('doubletap', '.js-sector, .js-task', toggle);
};
