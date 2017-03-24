var sectorAdd = require('./wheel/add');
var sectorEdit = require('./wheel/edit');
var sectorEditCancel = require('./wheel/edit-cancel');
var sectorEditSave = require('./wheel/edit-save');

var sector = {};

sector.add = function (event) {
  return sectorAdd(event);
};

sector.edit = function (event) {
  return sectorEdit(event);
};

sector.editCancel = function (event) {
  return sectorEditCancel(event);
};

sector.editSave = function (event) {
  return sectorEditSave(event);
};

module.exports = sector;
