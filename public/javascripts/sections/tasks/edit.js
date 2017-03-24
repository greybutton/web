var matrix = require('./pick-matrix/matrix');
var button = require('../common/button');
var toggleOff = require('../../functional/toggle-off');

module.exports = function (event) {

  event.preventDefault();

  toggleOff();

  var target = event.target;
  var task = $(target).closest('.js-task');

  $(task).children('.js-task__time, .js-task__text, .js-task__label, .js-button-group_lora').hide();

  var time = $(task).children('.js-task__time').text();
  var text = $(task).children('.js-task__text').text();
  var sector = $(task).attr('data-sector');
  var matrixQuater = $(task).attr('data-matrix');
  // var daily = $(task).attr('data-daily');

  // Set select wheel
  var options = $('.js-wheel_select').children();
  var newOptions = Array.prototype.map.call(options, function(option) {
    if (option.value === sector) {
      return $('<option/>', {
        value: option.value,
        text: option.text,
        selected: true
      });
    } else {
      return $('<option/>', {
        value: option.value,
        text: option.text
      });
    }
  });

  return $(task).append(
      $('<div/>', {
        class: 'js-task_edit'
      }).append(

        // Task input
        $('<label/>', {
          text: 'Сформируй задачу по SMART'
        }).append(

          $('<input>', {
            class: 'js-task__text_edit',
            type: 'text',
            name: 'text',
            value: text
          })

        ),

        // Time input
        $('<label/>', {
          text: 'Определи трудозатраты по времени для выполнения задачи'
        }).append(

          $('<input>', {
            class: 'js-task__time js-task__time_edit',
            type: 'tel',
            name: 'time',
            pattern: 'time',
            required: true,
            value: time
          })

        ),

        // Select wheel
        $('<label/>', {
          text: 'Выбери к какому сектору колеса принадлежит задача'
        }).append(
          $('<select/>', {
            class: 'js-wheel_select_edit'
          }).append(
            newOptions
          )
        ),

        matrix(matrixQuater),

        button.save(),
        button.cancel()

      )

    );
};
