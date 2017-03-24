var toggle = require('./toggle');

module.exports = function () {
  $('.js-wheel,' +
    '.js-tasks,' +
    '.js-daily-tasks,' +
    '.js-table').on('doubletap', '.js-sector, .js-task', toggle);
};
