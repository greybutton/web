var button = require('../common/button');

module.exports = function (sector) {
  return  $('.js-wheel').append(

            $('<div/>', {
              class: 'js-sector',
              'data-id': sector._id
            }).append(

              // Sector name
              $('<div>', {
                class: 'sector__title js-sector__title',
                text: sector.title
              }),

              // Sector score
              $('<div/>', {
                class: 'progress sector__progress js-sector__score',
                role: 'progressbar',
                'aria-value-score': sector.score,
                'aria-value-desirableScore': sector.desirableScore,
                'aria-valuemin': 0,
                'aria-valuemax': 10
              }).append(

                // Sector desirable score
                $('<div/>', {
                  class: 'progress-meter sector__desirable-score',
                  style: 'width:' + sector.desirableScore * 10 + '%;'
                }).append(
                  $('<div/>', {
                    class: 'progress-meter-text sector__progress-text',
                    text: sector.desirableScore + '/10'
                  })
                ),

                $('<div/>', {
                  class: 'progress-meter sector__score',
                  style: 'width:' + sector.score * 10 + '%;'
                }).append(
                  $('<div/>', {
                    class: 'progress-meter-text sector__progress-text',
                    text: sector.score + '/10'
                  })
                )

              ),

              $('<div/>', {
                class: 'button-group_lora js-button-group_lora'
              }).append(

                button.edit()

              )

            )
          );
};
