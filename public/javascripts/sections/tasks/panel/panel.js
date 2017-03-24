module.exports = function (sector) {
  return  $('.js-wheel_tabs-content').append(

            $('<div/>', {
              class: 'tabs-panel',
              id: sector._id,
              role: 'tabpanel'
            })

          );
};
