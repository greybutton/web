var button = {};

button.edit = function () {
  return  $('<button/>', {
            class: 'button secondary button_lora js-button_edit',
            text: 'Редактировать'
          });
};

button.delete = function () {
  return  $('<button/>', {
            class: 'button alert button_lora js-button_delete',
            text: 'Удалить'
          });
};

button.save = function () {
  return  $('<button/>', {
            class: 'button success button_lora js-button_save',
            text: 'Сохранить'
          });
};

button.cancel = function () {
  return  $('<button/>', {
            class: 'button secondary button_lora js-button_cancel',
            text: 'Отмена',
          });
};

module.exports = button;
