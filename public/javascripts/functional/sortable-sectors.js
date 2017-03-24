var updateWheel = require('../sections/wheel/update');
var updateTasks = require('../sections/tasks/update');

module.exports = function () {

  var sectors = document.querySelector('.js-wheel');
  var sortable = new Sortable.create(sectors, {
    animation: 150,
    filter: '.js-sector_edit, .js-sector_add',
    preventOnFilter: false,
    chosenClass: 'sector_chosen',
    dataIdAttr: 'data-id',
    onEnd: function (evt) {

      var indexes = {
        oldIndex: evt.oldIndex, // element's old index within parent
        newIndex: evt.newIndex, // element's new index within parent
        id: $(evt.item).attr('data-id')
      };

      $.ajax({
        type: 'PUT',
        url: '/sectors/updateOrder',
        data: indexes,
        dataType: 'JSON',
        success: function(response) {
          updateWheel(response[0].sectors);
          updateTasks(response[0].tasks);
        }
      });

    }

  });

};
