module.exports = function () {

  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;

  if ( (width/height) >= (4/3) ) {

    var event = $.Event('click');
    var tasks = document.querySelector('.js-tasks_section');
    $(tasks).trigger(event);

  }
};
