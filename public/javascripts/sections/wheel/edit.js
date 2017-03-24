var button = require('../common/button');
var toggleOff = require('../../functional/toggle-off');

module.exports = function (event) {

  event.preventDefault();

  toggleOff();

  var target = event.target;
  var sector = $(target).closest('.js-sector');

  var title = $(sector).children('.js-sector__title').text();
  var score = $(sector).children('.js-sector__score').attr('aria-value-score');
  var desirableScore = $(sector).children('.js-sector__score').attr('aria-value-desirableScore');

  $(sector).children('.js-sector__title, .js-sector__score, .js-button-group_lora').hide();

  return $(sector).append(
      $('<div/>', {
        class: 'js-sector_edit'
      }).append(

        // Sector name input
        $('<label/>', {
          text: 'Название сектора'
        }).append(

          $('<input>', {
            class: 'js-sector__title_edit',
            type: 'text',
            name: 'title',
            value: title
          })

        ),

        // Sector score input
        $('<label/>', {
          text: 'Текущий уровень',
          for: 'score_edit'
        }),

        $('<div/>', {
          class: 'input-group'
        }).append(

          $('<input/>', {
            class: 'input-group-field js-sector__score_edit',
            id: 'score_edit',
            type: 'number',
            min: '0',
            max: '10',
            name: 'score',
            value: score
          }),

          $('<label/>',{
            class: 'input-group-label',
            text: '/10'
          })

        ),

        // Sector desirable score input
        $('<label/>', {
          text: 'Желаемый уровень',
          for: 'desirable-score_edit'
        }),

        $('<div/>', {
          class: 'input-group'
        }).append(

          $('<input/>', {
            class: 'input-group-field js-sector__desirable-score_edit',
            id: 'desirable-score_edit',
            type: 'number',
            min: '0',
            max: '10',
            name: 'desirable-score',
            value: desirableScore
          }),

          $('<label/>',{
            class: 'input-group-label',
            text: '/10'
          })

        ),

        button.save(),
        button.cancel()

      )
    );
};
