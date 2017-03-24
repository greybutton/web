var updateWheel = require('./update');
var updateTasks = require('../tasks/update');
var notice = require('../common/notice');

module.exports = function (event) {
  event.preventDefault();

  // simple validation
  var title = $('.js-sector__title_add').val();
  var score = $('.js-sector__score_add').val();
  var desirableScore = $('.js-sector__desirable-score_add').val();

  if (title.length === 0 && score.length === 0 && desirableScore.length === 0) {

    $('.js-sector__title_add').addClass('is-invalid-input');
    $('.js-sector__score_add').addClass('is-invalid-input');
    $('.js-sector__desirable-score_add').addClass('is-invalid-input');

  } else if (title.length === 0) {

    $('.js-sector__title_add').addClass('is-invalid-input');

  } else if (score.length === 0) {

    $('.js-sector__score_add').addClass('is-invalid-input');

  } else if (desirableScore.length === 0) {

    $('.js-sector__desirable-score_add').addClass('is-invalid-input');

  } else {

    var sector = {
      title: title,
      score: score,
      desirableScore: desirableScore
    };

    $.ajax({
      type: 'POST',
      url: '/sectors/add',
      data: sector,
      dataType: 'JSON',
      success: function(response) {
        updateWheel(response[0].sectors);
        updateTasks(response[0].tasks);
      }
    }).done(function() {

      notice.add();
      notice.remove('add');

    });

  }

};
