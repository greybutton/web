module.exports = function (sector) {
  return  $('.js-wheel_select').append(

            $('<option/>', {
              value: sector._id,
              text: sector.title
            })

          );
};
