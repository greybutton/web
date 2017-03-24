var notice = {};

notice.add = function () {
  return  $('body').append(

            $('<span/>', {
              class: 'label success notice js-add_success',
              text: '\u2713 Добавлено'
            }).prepend(

              $('<i/>', {
                class: 'fi-check'
              })

            )

          );

};

notice.delete = function () {
  return  $('body').append(

            $('<span/>', {
              class: 'label warning notice js-delete_success',
              text: '\u2713 Удалено'
            }).prepend(

              $('<i/>', {
                class: 'fi-check'
              })

            )

          );

};

notice.save = function () {
  return  $('body').append(

            $('<span/>', {
              class: 'label success notice js-save_success',
              text: '\u2713 Сохранено'
            }).prepend(

              $('<i/>', {
                class: 'fi-check'
              })

            )

          );

};

notice.remove = function (type) {
  return  setTimeout(function() {
            $('.js-' + type + '_success').remove();
          }, 2000);
};

module.exports = notice;
