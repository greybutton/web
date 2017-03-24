var updateTasks = require('./update');
var notice = require('../common/notice');

module.exports = function (event) {

  event.preventDefault();

  // Check error
  var invalid = $('.is-invalid-input')[0];
  if (invalid) {
    return false;
  }

  // simple validation
  var text = $('.js-task__text_add').val();
  var time = $('.js-task__time_add').val();
  var sector = $('.js-wheel_select').val();
  var label = $('.js-wheel_select option:selected').text();
  var daily = $('.js-task__daily-switch')[0].checked;

  if (text.length === 0 && time.length === 0) {

    $('.js-task__text_add').addClass('is-invalid-input');
    $('.js-task__time_add').addClass('is-invalid-input');

  } else if (text.length === 0) {

    $('.js-task__text_add').addClass('is-invalid-input');

  } else if (time.length === 0) {

    $('.js-task__time_add').addClass('is-invalid-input');

  } else {

    var task = {
      text: text,
      time: time,
      sector: sector,
      label: label
    };

    if (daily) {
      task.daily = true;
    } else {

      var urgent = $('.js-urgent')[0].checked;
      var notUrgent = $('.js-not-urgent')[0].checked;
      var important = $('.js-important')[0].checked;
      var notImportant = $('.js-not-important')[0].checked;

      if (urgent && important) {
        task.matrixQuater = 'first';
      }

      if (notUrgent && important) {
        task.matrixQuater = 'second';
      }

      if (urgent && notImportant) {
        task.matrixQuater = 'third';
      }

      if (notUrgent && notImportant) {
        task.matrixQuater = 'fourth';
      }

    }

    $.ajax({
      type: 'POST',
      url: '/tasks/add',
      data: task,
      dataType: 'JSON',
      success: function(response) {
        updateTasks(response);
      }
    }).done(function() {

      // Clear the form inputs
      $('.js-task__text_add, .js-task__time_add').val('');

      $('.js-urgent')[0].checked = false;
      $('.js-not-urgent')[0].checked = false;
      $('.js-important')[0].checked = false;
      $('.js-not-important')[0].checked = false;

      $('.js-task_add .js-button_add')[0].disabled = true;

      // Reset daily tasks switch
      if (daily) {
        $('.js-task__daily-switch')[0].checked = false;
        $('.js-task__matrix').toggle();
      }

      notice.add();
      notice.remove('add');

    });

  }
};
