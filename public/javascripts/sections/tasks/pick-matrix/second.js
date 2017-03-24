module.exports = function () {
  return  $('<div/>', {
            class: 'js-task__matrix',
            text: 'Выбери срочность и важность задачи'
          }).append(

            // Urgent, not urgent
            $('<div/>', {
              class: 'urgent button-group'
            }).append(
              $('<input/>', {
                class: 'eisenhower-pick js-urgent_edit',
                id: 'urgent_edit',
                type: 'radio',
                name: 'urgent',
                required: true
              }),
              $('<label/>', {
                class: 'button',
                for: 'urgent_edit',
                text: 'Срочно'
              }),
              $('<input/>', {
                class: 'eisenhower-pick js-not-urgent_edit',
                id: 'not-urgent_edit',
                type: 'radio',
                name: 'urgent',
                checked: true
              }),
              $('<label/>', {
                class: 'button',
                for: 'not-urgent_edit',
                text: 'Не срочно'
              })
            ),

            // Important, not important
            $('<div/>', {
              class: 'important button-group'
            }).append(
              $('<input/>', {
                class: 'eisenhower-pick js-important_edit',
                id: 'important_edit',
                type: 'radio',
                name: 'important',
                required: true,
                checked: true
              }),
              $('<label/>', {
                class: 'button',
                for: 'important_edit',
                text: 'Важно'
              }),
              $('<input/>', {
                class: 'eisenhower-pick js-not-important_edit',
                id: 'not-important_edit',
                type: 'radio',
                name: 'important'
              }),
              $('<label/>', {
                class: 'button',
                for: 'not-important_edit',
                text: 'Не важно'
              })
            )
          );
};
