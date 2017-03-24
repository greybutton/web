module.exports = function () {
  return  $('.js-wheel_tabs').append(

            $('<li/>', {
              class: 'tabs-title is-active',
              role: 'presentation'
            }).append(

              $('<a/>', {
                href: '#all',
                text: 'Все',
                role: 'tab',
                'aria-controls': 'all',
                'aria-selected': true
              })

            )

          );
};
