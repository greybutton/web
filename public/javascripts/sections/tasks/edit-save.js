var updateTasks = require('./update');
var toggleOn = require('../../functional/toggle-on');
var notice = require('../common/notice');

module.exports = function (event) {

  event.preventDefault();

  var target = event.target;
  var task = $(target).closest('.js-task');
  var id = $(task).attr('data-id');
  var daily = $(task).attr('data-daily');

  // Pop up a confirmation dialog
  var confirmation = confirm('Вы уверены, что хотите обновить эту задачу?');

  if (confirmation) {

    var updateTask = {
      text: $('.js-task__text_edit').val(),
      time: $('.js-task__time_edit').val(),
      sector: $('.js-task_edit .js-wheel_select_edit').val()
    };

    if (daily) {
      updateTask.daily = true;
      updateTask.label = $('.js-wheel_select_edit option:selected').text();
    } else {

      var urgent = $('.js-urgent_edit')[0].checked;
      var notUrgent = $('.js-not-urgent_edit')[0].checked;
      var important = $('.js-important_edit')[0].checked;
      var notImportant = $('.js-not-important_edit')[0].checked;

      if (urgent && important) {
        updateTask.matrixQuater = 'first';
      }

      if (notUrgent && important) {
        updateTask.matrixQuater = 'second';
      }

      if (urgent && notImportant) {
        updateTask.matrixQuater = 'third';
      }

      if (notUrgent && notImportant) {
        updateTask.matrixQuater = 'fourth';
      }

    }

    $.ajax({
      type: 'PUT',
      url: '/tasks/update/' + id,
      data: updateTask,
      dataType: 'JSON',
      success: function(response) {
        updateTasks(response);
      }
    }).done(function() {

      toggleOn();
      notice.save();
      notice.remove('save');

    });

  } else {
    return false;
  }

};
