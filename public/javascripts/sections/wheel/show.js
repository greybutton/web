var tabAll = require('../tasks/tab/tab-all');
var panelAll = require('../tasks/panel/panel-all');
var tableAll = require('../tasks/table/table-all');
var tabSector = require('../tasks/tab/tab');
var panelSector = require('../tasks/panel/panel');
var tableSector = require('../tasks/table/table');

var selectOptions = require('../tasks/select-options');

var sectorShow = require('./sector');
var sectorForm = require('./form');

module.exports = function (json) {

  tabAll();
  panelAll();
  tableAll();

  json.forEach(function(sector) {

    sectorShow(sector);
    selectOptions(sector);
    tabSector(sector);
    panelSector(sector);
    tableSector(sector);

  });

  if (json.length < 8) {

    sectorForm();

  } else {
    $('.js-wheel').append(
      $('<div/>', {
        text: 'Вы добавили максимум секторов (8)'
      })
    );
  }

};
