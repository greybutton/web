module.exports = function () {
  return  $('.js-wheel').append(

            $('<form/>', {
              class: 'js-sector_add',
              'data-abide': '',
              'novalidate': ''
            }).append(

              ($('<hr>')),

              // Sector name input
              $('<label/>', {
                text: 'Название сектора'
              }).append(

                $('<input>', {
                  class: 'js-sector__title_add',
                  type: 'text',
                  placeholder: 'Работа/Семья/Хобби и т.п.',
                  name: 'title',
                  required: ''
                })

              ),

              // Sector score input
              $('<label/>', {
                text: 'Текущий уровень',
                for: 'score'
              }),

              $('<div/>', {
                class: 'input-group'
              }).append(

                $('<input/>', {
                  class: 'input-group-field js-sector__score_add',
                  id: 'score',
                  type: 'number',
                  pattern: 'number',
                  min: '0',
                  max: '10',
                  name: 'score',
                  required: ''
                }),

                $('<label/>',{
                  class: 'input-group-label',
                  text: '/10'
                })

              ),

              // Sector desirable score input
              $('<label/>', {
                text: 'Желаемый уровень',
                for: 'desirable-score'
              }),

              $('<div/>', {
                class: 'input-group'
              }).append(

                $('<input/>', {
                  class: 'input-group-field js-sector__desirable-score_add',
                  id: 'desirable-score',
                  type: 'number',
                  pattern: 'integer',
                  min: '0',
                  max: '10',
                  name: 'desirable-score',
                  required: ''
                }),

                $('<label/>',{
                  class: 'input-group-label',
                  text: '/10'
                })

              ),

              // Sector add button
              $('<button/>', {
                class: 'button js-button_add',
                text: 'Добавить сектор',
                type: 'submit'
              })

            )

          );
};
