var init = require('./functional/init');
var sector = require('./sections/sector');
var task = require('./sections/task');

$(document).ready(function() {

  init();

  // Override pattern time from HH:MM:SS to HH:MM
  Foundation.Abide.defaults.patterns['time'] = /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){1}$/;
  // Init foundation inside for init data-abide
  $(document).foundation();

  // Wheel buttons
  $('.js-wheel').on('click', '.js-button_add', sector.add);

  $('.js-wheel').on('click', '.js-button_edit', sector.edit);

  $('.js-wheel').on('click', '.js-button_cancel', sector.editCancel);

  $('.js-wheel').on('click', '.js-button_save', sector.editSave);

  // Show sector table
  $('.js-wheel_tabs').on('tap', '.tabs-title', function(event) {

    var target = event.target.getAttribute('aria-controls');
    var tables = $.find('[data-table-id]');
    // document.querySelectorAll('[data-table-id]') won't work with forEach on smartphone
    // It maybe work in browser DevTools but not on real device

    tables.forEach(function(table) {
      $(table).removeClass('table-active');
    });

    $('[data-table-id=' + target + ']').addClass('table-active');

  });

  // Type only numbers in time input
  $('.js-task_add, .js-task_edit').on('keypress', '.js-task__time', function(event) {

    var chr = getChar(event);

    if (event.ctrlKey || event.altKey || chr == null) return;
    if (chr < '0' || chr > '9') return false;

    function getChar(event) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which);
    }

  });

  // Add separator ':' in time input
  $('.js-task_add, .js-task_edit').on('input', '.js-task__time', function(event) {

    var target = event.target;
    var value = target.value;

    if (value.length === 2) {
      target.value += ':';
    }

  });

  // Delete value in time input if press backspace
  $('.js-task_add, .js-task_edit').on('keyup', '.js-task__time', function(event) {

    var target = event.target;
    var value = target.value;

    if (event.which === 8) {
      target.value = '';
    }

  });

  // Hide/show matrix inputs if daily task true/false
  $('.js-task_add').on('click', '.js-task__daily-switch', function() {

    $('.js-task__matrix').toggle();

    var daily = $('.js-task__daily-switch')[0].checked;

    if (daily) {
      $('.js-button_add').attr('disabled', false);
    } else {
      $('.js-button_add').attr('disabled', true);
    }

  });

  // Undisabled submit button if matrix picked
  $('.js-task_add').on('click', '.js-urgent, .js-not-urgent, .js-important, .js-not-important', function() {

    var urgent = $('.js-urgent')[0].checked;
    var notUrgent = $('.js-not-urgent')[0].checked;
    var important = $('.js-important')[0].checked;
    var notImportant = $('.js-not-important')[0].checked;

    if ( (urgent || notUrgent) && (important || notImportant) ) {
      $('.js-button_add').attr('disabled', false);
    }

  });

  // Buttons form task add
  $('.js-task_add').on('click', '.js-button_add', task.add);

  $('.js-task_add').on('click', '.js-button_reset', function() {

    $('.js-task_add .js-button_add')[0].disabled = true;

    // Reset daily tasks switch
    var daily = $('.js-task__daily-switch')[0].checked;
    if (daily) {
      $('.js-task__matrix').show();
    }

  });

  // Task buttons
  $('.js-tasks, .js-daily-tasks, .js-table').on('click', '.js-button_edit', task.edit);

  $('.js-tasks, .js-daily-tasks, .js-table').on('click', '.js-button_delete', task.delete);

  $('.js-tasks, .js-daily-tasks, .js-table').on('click', '.js-button_cancel', task.editCancel);

  $('.js-tasks, .js-daily-tasks, .js-table').on('click', '.js-button_save', task.editSave);

});
