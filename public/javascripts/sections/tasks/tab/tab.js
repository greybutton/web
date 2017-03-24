module.exports = function (sector) {
  return  $('.js-wheel_tabs').append(

            $('<li/>', {
              class: 'tabs-title',
              role: 'presentation'
            }).append(

              $('<a/>', {
                href: '#' + sector._id,
                text: sector.title,
                role: 'tab',
                'aria-controls': sector._id
              })

            )

          );
};
