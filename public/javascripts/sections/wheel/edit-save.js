var updateWheel = require('./update');
var updateTasks = require('../tasks/update');
var notice = require('../common/notice');
var toggleOn = require('../../functional/toggle-on');

module.exports = function (event) {

  event.preventDefault();

  var target = event.target;
  var sector = $(target).closest('.js-sector');
  var id = $(sector).attr('data-id');

  // Pop up a confirmation dialog
  var confirmation = confirm('Вы уверены, что хотите обновить этот сектор?');

  if (confirmation) {

    var updateSector = {
      title: $('.js-sector__title_edit').val(),
      score: $('.js-sector__score_edit').val(),
      desirableScore: $('.js-sector__desirable-score_edit').val()
    };

    $.ajax({
      type: 'PUT',
      url: '/sectors/update/' + id,
      data: updateSector,
      dataType: 'JSON',
      success: function(response) {
        updateWheel(response[0].sectors);
        updateTasks(response[0].tasks);
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
