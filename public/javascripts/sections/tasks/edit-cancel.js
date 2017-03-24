var toggleOn = require('../../functional/toggle-on');

module.exports = function (event) {
  event.preventDefault();

  toggleOn();

  var target = event.target;
  var task = $(target).closest('.js-task');

  $('.js-task_edit').remove();

  $(task).children('.js-task__time, .js-task__text').show();

};
