var toggleOn = require('../../functional/toggle-on');

module.exports = function (event) {
  event.preventDefault();

  toggleOn();

  var target = event.target;
  var sector = $(target).closest('.js-sector');

  $('.js-sector_edit').remove();

  $(sector).children('.js-sector__title, .js-sector__score').show();

};
