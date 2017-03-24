var taskShow = require('../sections/tasks/show');
var taskForm = require('../sections/tasks/form');
var sortableTask = require('./sortable-tasks');
var sortableDaily = require('./sortable-daily');
var sectionTasks = require('./section-tasks');
var toggleOn = require('./toggle-on');

module.exports = function () {

  taskForm();

  $.ajax({
    type: 'GET',
    url: '/tasks',
    dataType: 'JSON',
    success: function(response) {
      taskShow(response);
    }
  }).done(function() {

    sortableTask();
    sortableDaily();
    sectionTasks();
    toggleOn();

    // Scrollbars
    var tasksScrollbar = document.querySelector('.js-tasks');
    var dailyTasksScrollbar = document.querySelector('.js-daily-tasks');

    Ps.initialize(tasksScrollbar);
    Ps.initialize(dailyTasksScrollbar);

    // Perfect-scrollbar (Ps) have some problem with touch propagation
    // https://github.com/noraesae/perfect-scrollbar/issues/538
    // In this case, Ps block doubletap in table on smartphone
    // Init Ps on tables only if device is not a touch device
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if(!isTouchDevice) {

      var tableFirstTasksScrollbar  = Array.prototype.slice.call(
                                        document.querySelectorAll('.js-table-first')
                                      );
      var tableSecondTasksScrollbar = Array.prototype.slice.call(
                                        document.querySelectorAll('.js-table-second')
                                      );
      var tableThirdTasksScrollbar  = Array.prototype.slice.call(
                                        document.querySelectorAll('.js-table-third')
                                      );
      var tableFourthTasksScrollbar = Array.prototype.slice.call(
                                        document.querySelectorAll('.js-table-fourth')
                                      );

      var allQuaters = tableFirstTasksScrollbar.concat(tableSecondTasksScrollbar,
                                                       tableThirdTasksScrollbar,
                                                       tableFourthTasksScrollbar);

      allQuaters.forEach(function(quater) {
        Ps.initialize(quater);
      });

    }

  });

};
