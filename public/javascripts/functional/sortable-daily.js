var updateTasks = require('../sections/tasks/update');

module.exports = function () {

  var tasks = document.querySelector('.js-daily-tasks');
  var sortable = new Sortable.create(tasks, {
    animation: 150,
    filter: '.js-task_edit',
    preventOnFilter: false,
    chosenClass: 'task_chosen',
    dataIdAttr: 'data-id',
    onEnd: function (evt) {

      var indexes = {
        oldIndex: evt.oldIndex, // element's old index within parent
        newIndex: evt.newIndex, // element's new index within parent
        id: $(evt.item).attr('data-id')
      };

      $.ajax({
        type: 'PUT',
        url: '/tasks/dailyUpdateOrder',
        data: indexes,
        dataType: 'JSON',
        success: function(response) {
          updateTasks(response);
        }
      });

    }

  });

};
