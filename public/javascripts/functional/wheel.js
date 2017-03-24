var showWheel = require('../sections/wheel/show');
var sortableSectors = require('./sortable-sectors');

module.exports = function () {

  $.ajax({
    type: 'GET',
    url: '/sectors',
    dataType: 'JSON',
    success: function(response) {
      showWheel(response);
    }
  }).done(function() {

    sortableSectors();

  });

};
