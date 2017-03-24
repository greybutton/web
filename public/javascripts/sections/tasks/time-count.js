module.exports = function (tasks) {

  var hours = 0;
  var minutes = 0;

  tasks.forEach(function(task) {
    var time = task.time.split(/:|-|;|\*|#/);
    hours += parseInt(time[0]);
    minutes += parseInt(time[1]);
  });

  if (minutes >= 60) {
    hours += parseInt(minutes/60);
    minutes = minutes % 60;
  }

  return {
    hours: hours,
    minutes: minutes
  };

};
