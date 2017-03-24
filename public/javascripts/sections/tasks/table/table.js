module.exports = function (sector) {
  return  $('.js-table').append(

            $('<table/>', {
              class: 'stack table',
              'data-table-id': sector._id
            }).append(

              $('<tbody/>').append(

                $('<tr/>').append(

                  // First quater
                  $('<td/>').append(
                    $('<div/>', {
                      class: 'cell-title cell-title_first',
                      text: 'Срочно и важно'
                    }),
                    $('<ul/>', {
                      class: 'js-table-first'
                    })
                  ),

                  // Second quater
                  $('<td/>').append(
                    $('<div/>', {
                      class: 'cell-title cell-title_second',
                      text: 'Не срочно и важно'
                    }),
                    $('<ul/>', {
                      class: 'js-table-second'
                    })
                  )

                ), // End tr

                $('<tr/>').append(

                  // Third quater
                  $('<td/>').append(
                    $('<div/>', {
                      class: 'cell-title cell-title_third',
                      text: 'Срочно и не важно'
                    }),
                    $('<ul/>', {
                      class: 'js-table-third'
                    })
                  ),

                  // Fourth quater
                  $('<td/>').append(
                    $('<div/>', {
                      class: 'cell-title cell-title_fourth',
                      text: 'Не срочно и не важно'
                    }),
                    $('<ul/>', {
                      class: 'js-table-fourth'
                    })
                  )

                ) // End tr

              ) // End tbody

            )

          );
};
