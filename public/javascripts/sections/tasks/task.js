var button = require('../common/button');

var task = {};

task.default = function (task) {
  return  $('<li/>', {
            class: 'task js-task',
            'data-id': task._id,
            'data-sector': task.sector,
            'data-matrix': task.matrixQuater
          }).append(

            $('<div/>', {
              class: 'task__time js-task__time',
              text: task.time
            }),

            $('<div/>', {
              class: 'task__text js-task__text',
              text: task.text
            }),

            $('<div/>', {
              class: 'button-group_lora js-button-group_lora'
            }).append(

              button.edit(),
              button.delete()

            )
          );
};

task.daily = function (task) {
  return  $('<li/>', {
            class: 'task js-task',
            'data-id': task._id,
            'data-sector': task.sector,
            'data-daily': true
          }).append(

            $('<div/>', {
              class: 'task__time js-task__time',
              text: task.time
            }),

            $('<span/>', {
              class: 'task__label secondary label js-task__label',
              text: task.label
            }),

            $('<div/>', {
              class: 'task__text js-task__text',
              text: task.text
            }),

            $('<div/>', {
              class: 'button-group_lora js-button-group_lora'
            }).append(

              button.edit(),
              button.delete()

            )
          );
};

task.first = function (task) {
  return  $('<li/>', {
            class: 'task task__first js-task',
            'data-id': task._id,
            'data-sector': task.sector,
            'data-matrix': task.matrixQuater
          }).append(

            $('<div/>', {
              class: 'task__time js-task__time',
              text: task.time
            }),

            $('<div/>', {
              class: 'task__text js-task__text',
              text: task.text
            }),

            $('<div/>', {
              class: 'button-group_lora js-button-group_lora'
            }).append(

              button.edit(),
              button.delete()

            )
          );
};

task.second = function (task) {
  return  $('<li/>', {
            class: 'task task__second js-task',
            'data-id': task._id,
            'data-sector': task.sector,
            'data-matrix': task.matrixQuater
          }).append(

            $('<div/>', {
              class: 'task__time js-task__time',
              text: task.time
            }),

            $('<div/>', {
              class: 'task__text js-task__text',
              text: task.text
            }),

            $('<div/>', {
              class: 'button-group_lora js-button-group_lora'
            }).append(

              button.edit(),
              button.delete()

            )
          );
};

module.exports = task;
