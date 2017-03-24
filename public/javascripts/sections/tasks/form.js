module.exports = function () {
  return  $('.js-task-form').append(

            $('<form/>', {
              class: 'js-task_add',
              'data-abide': '',
              'novalidate': ''
            }).append(

              // Task input
              $('<label/>', {
                text: 'Сформируй задачу по SMART'
              }).append(

                $('<input>', {
                  class: 'js-task__text_add',
                  type: 'text',
                  name: 'text',
                  placeholder: 'Сделать мем в 4:20',
                  autofocus: true,
                  required: true
                })

              ),

              // Time input
              $('<label/>', {
                text: 'Определи трудозатраты по времени для выполнения задачи'
              }).append(

                $('<input>', {
                  class: 'js-task__time js-task__time_add',
                  type: 'tel',
                  name: 'time',
                  placeholder: '00:15',
                  pattern: 'time',
                  required: true
                })

              ),

              // Select wheel
              $('<label/>', {
                text: 'Выбери к какому сектору колеса принадлежит задача'
              }).append(
                $('<select/>', {
                  class: 'js-wheel_select',
                  id: 'select',
                  required: true
                })
              ),

              // Pick daily
              $('<div/>', {
                class: 'js-task__daily',
                text: 'Ежедневная задача'
              }).append(
                $('<div/>', {
                  class: 'switch small'
                }).append(
                  $('<input/>', {
                    class: 'switch-input js-task__daily-switch',
                    id: 'daily',
                    type: 'checkbox',
                    name: 'daily'
                  }),
                  $('<label/>', {
                    class: 'switch-paddle',
                    for: 'daily'
                  })
                )
              ),

              // Pick matrix
              $('<div/>', {
                class: 'js-task__matrix',
                text: 'Выбери срочность и важность задачи'
              }).append(

                // Urgent, not urgent
                $('<div/>', {
                  class: 'urgent button-group'
                }).append(

                  $('<input/>', {
                    class: 'eisenhower-pick js-urgent',
                    id: 'urgent',
                    type: 'radio',
                    name: 'urgent',
                    required: true
                  }),

                  $('<label/>', {
                    class: 'button',
                    for: 'urgent',
                    text: 'Срочно'
                  }),

                  $('<input/>', {
                    class: 'eisenhower-pick js-not-urgent',
                    id: 'not-urgent',
                    type: 'radio',
                    name: 'urgent'
                  }),

                  $('<label/>', {
                    class: 'button',
                    for: 'not-urgent',
                    text: 'Не срочно'
                  })

                ),

                // Important, not important
                $('<div/>', {
                  class: 'important button-group'
                }).append(

                  $('<input/>', {
                    class: 'eisenhower-pick js-important',
                    id: 'important',
                    type: 'radio',
                    name: 'important',
                    required: true
                  }),

                  $('<label/>', {
                    class: 'button',
                    for: 'important',
                    text: 'Важно'
                  }),

                  $('<input/>', {
                    class: 'eisenhower-pick js-not-important',
                    id: 'not-important',
                    type: 'radio',
                    name: 'important'
                  }),

                  $('<label/>', {
                    class: 'button',
                    for: 'not-important',
                    text: 'Не важно'
                  })

                )
              ),

              // Buttons
              $('<div/>', {
                class: 'row'
              }).append(

                // Task add button
                $('<div/>', {
                  class: 'small-6 columns'
                }).append(

                  $('<button/>', {
                    class: 'button js-button_add',
                    type: 'submit',
                    disabled: true,
                    text: 'Добавить задачу',
                    value: 'Submit'
                  })

                ),

                // Input reset button
                $('<div/>', {
                  class: 'small-6 columns'
                }).append(

                  $('<button/>', {
                    class: 'button secondary js-button_reset',
                    type: 'reset',
                    text: 'Сброс',
                    value: 'Reset'
                  })

                )
              )

            )

          );
};
