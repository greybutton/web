var taskShow = require('./task');
var timeCount = require('./time-count');

module.exports = function (json) {

  if (json.length === 0) {
    return;
  }

  var tasks = json.important.concat(json.notImportant);
  var dailyTasks = json.daily;

  tasks.forEach(function(task) {

    // Add task from first quater to tasks section
    if (task.matrixQuater === 'first') {

      // Add sector tasks to sector panel
      $('#' + task.sector).append(
        taskShow.first(task)
      );

      // Add tasks to all panel
      $('.js-all-tasks').append(
        taskShow.first(task)
      );

    }

    // Add task from second quater to tasks section
    if (task.matrixQuater === 'second') {

      // Add sector tasks to sector panel
      $('#' + task.sector).append(
        taskShow.second(task)
      );

      // Add tasks to all panel
      $('.js-all-tasks').append(
        taskShow.second(task)
      );

    }

    // Add sector tasks to sector table
    $('[data-table-id=' + task.sector + ']')
      .children()
      .find('.js-table-' + task.matrixQuater)
      .append(taskShow.default(task));

    // Add all tasks to table all
    $('[data-table-id=all]')
      .children()
      .find('.js-table-' + task.matrixQuater)
      .append(taskShow.default(task));

  });

  /*
   * Daily tasks
   */

  var dailyTotalTasks = dailyTasks.length;
  $('.js-daily-tasks').append(
    $('<div/>', {
      class: 'daily-tasks__task-count',
      text: 'Общее количество ежедневных задач ' + dailyTotalTasks
    })
  );

  var dailyTotalTime = timeCount(dailyTasks);
  $('.js-daily-tasks').append(
    $('<div/>', {
      class: 'daily-tasks__time-count',
      text: 'Общее время на ежедневные задачи ' +
            dailyTotalTime.hours + 'ч. ' +
            dailyTotalTime.minutes + 'мин.'
    })
  );

  dailyTasks.forEach(function(task) {
    $('.js-daily-tasks').append(
      taskShow.daily(task)
    );
  });

};
