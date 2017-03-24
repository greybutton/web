var updateTasks = require('./update');
var notice = require('../common/notice');

module.exports = function (event) {

  event.preventDefault();

  var target = event.target;
  var task = $(target).closest('.js-task');
  var id = $(task).attr('data-id');
  var matrixQuater = $(task).attr('data-matrix');
  var daily = $(task).attr('data-daily');

  var deleteTask = {
    matrixQuater: matrixQuater
  };

  if (daily) {
    deleteTask.daily = true;
  }

  // Pop up a confirmation dialog
  var confirmation = confirm('Вы уверены, что хотите удалить эту задачу?');

  if (confirmation) {

    $.ajax({
      type: 'DELETE',
      url: '/tasks/delete/' + id,
      data: deleteTask,
      dataType: 'JSON'
    }).done(function(response) {

      if (response) {

        updateTasks(response);

        notice.delete();
        notice.remove('delete');

      } else {
        alert('Error: ' + response.msg);
      }

    });

  } else {
    return false;
  }

};
