module.exports = function () {
  return  $('.js-wheel_tabs-content').append(

            $('<div/>', {
              class: 'tabs-panel is-active js-all-tasks',
              id: 'all',
              role: 'tabpanel'
            })

          );
};
