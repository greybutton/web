var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
 * GET tasks
 */
router.get('/', function(req, res) {

  sendTask(res);

});

/*
 * POST to tasks
 */
router.post('/add', function(req, res) {
  var task = req.body;

  if (task.daily) {

    User.findOneAndUpdate(
      {},
      {
        '$push': {
          'tasks.daily': {
            '$each': [task],
            '$position': 0
          }
        }
      },
      {upsert: true},
      function(err, result) {

        sendTask(res);

      }
    );

  } else {

    if(task.matrixQuater === 'first' || task.matrixQuater === 'second') {

      User.findOneAndUpdate(
        {},
        {
          '$push': {
            'tasks.important': {
              '$each': [task],
              '$position': 0
            }
          }
        },
        {upsert: true},
        function(err, result) {

          sendTask(res);

        }
      );

    } else {

      User.findOneAndUpdate(
        {},
        {
          '$push': {
            'tasks.notImportant': {
              '$each': [task],
              '$position': 0
            }
          }
        },
        {upsert: true},
        function(err, result) {

          sendTask(res);

        }
      );

    }

  }

});

/*
 * DELETE task
 */
router.delete('/delete/:id', function(req, res) {
  var task = req.body;
  var taskToDelete = req.params.id;

  if(task.daily) {

    User.update(
      {},
      {
        '$pull': {
          'tasks.daily': {
            '_id': taskToDelete
          }
        }
      },
      function(err, result) {
        sendTask(res);
      }
    );

  } else {

    if(task.matrixQuater === 'first' || task.matrixQuater === 'second') {
      User.update(
        {},
        {
          '$pull': {
            'tasks.important': {
              '_id': taskToDelete
            }
          }
        },
        function(err, result) {
          sendTask(res);
        }
      );

    } else {

      User.update(
        {},
        {
          '$pull': {
            'tasks.notImportant': {
              '_id': taskToDelete
            }
          }
        },
        function(err, result) {
          sendTask(res);
        }
      );

    }

  }

});

/*
 * UPDATE task
 */
router.put('/update/:id', function(req, res) {
  var updateTask = req.body;
  var taskToUpdate = req.params.id;
  var docs = {};

  // If update tasks is daily
  if (updateTask.daily) {

    var query = {'tasks.daily._id': taskToUpdate};

    for (var field in updateTask) {
      docs['tasks.daily.$.' + field] = updateTask[field];
    }

    User.findOneAndUpdate(query, {$set: docs}, function(err, result) {

      sendTask(res);

    });

  } else {

    // If update task from important to important
    if(updateTask.matrixQuater === 'first' || updateTask.matrixQuater === 'second') {

      var query = {'tasks.important._id': taskToUpdate};

      for (var field in updateTask) {
        docs['tasks.important.$.' + field] = updateTask[field];
      }

      User.findOneAndUpdate(query, {$set: docs}, function(err, result) {

        if (result) {

          sendTask(res);

        } else {

          // If update task from notImportant to important
          User.update(
            {},
            {
              '$pull': {
                'tasks.notImportant': {
                  '_id': taskToUpdate
                }
              }
            },
            function(err, result) {

              if (err) {
                console.log(err);
              } else {
                User.update(
                  {},
                  {
                    '$push': {
                      'tasks.important': {
                        '$each': [updateTask],
                        '$position': 0
                      }
                    }
                  },
                  function(err, result) {

                    sendTask(res);

                  }
                );
              }

            }

          );

        }

      });

    } else {

      // If update task from notImportant to notImportant
      var query = {'tasks.notImportant._id': taskToUpdate};

      for (var field in updateTask) {
        docs['tasks.notImportant.$.' + field] = updateTask[field];
      }

      User.findOneAndUpdate(query, {$set: docs}, function(err, result) {

        if (result) {

          sendTask(res);

        } else {

          // If update task from important to notImportant
          User.update(
            {},
            {
              '$pull': {
                'tasks.important': {
                  '_id': taskToUpdate
                }
              }
            },
            function(err, result) {

              if (err) {
                console.log(err);
              } else {
                User.update(
                  {},
                  {
                    '$push': {
                      'tasks.notImportant': {
                        '$each': [updateTask],
                        '$position': 0
                      }
                    }
                  },
                  function(err, result) {

                    sendTask(res);

                  }
                );
              }

            }

          );

        }

      });

    }

  }

});

/*
 * UPDATE tasks order
 */
router.put('/updateOrder', function(req, res) {
  var oldIndex = parseInt(req.body.oldIndex);
  var newIndex = parseInt(req.body.newIndex);
  var id = req.body.id;

  User.find({}, {}, pullAndPush);

  function pullAndPush(err, result) {

    var tasks = result[0].tasks.important;
    var item = tasks.splice(oldIndex, 1);

    User.update(
      {},
      {
        '$pull': {
          'tasks.important': {
            '_id': id
          }
        }
      },
      function(err, result) {

        if (err) {
          console.log(err);
        } else {
          User.update(
            {},
            {
              '$push': {
                'tasks.important': {
                  '$each': item,
                  '$position': newIndex
                }
              }
            },
            function(err, result) {

              sendTask(res);

            }
          );
        }

      }

    );

  }

});

/*
 * UPDATE daily tasks order
 */
router.put('/dailyUpdateOrder', function(req, res) {
  var oldIndex = parseInt(req.body.oldIndex);
  var newIndex = parseInt(req.body.newIndex);
  var id = req.body.id;

  User.find({}, {}, pullAndPush);

  function pullAndPush(err, result) {

    var tasks = result[0].tasks.daily;
    var item = tasks.splice(oldIndex, 1);

    User.update(
      {},
      {
        '$pull': {
          'tasks.daily': {
            '_id': id
          }
        }
      },
      function(err, result) {

        if (err) {
          console.log(err);
        } else {

          User.update(
            {},
            {
              '$push': {
                'tasks.daily': {
                  '$each': item,
                  '$position': newIndex
                }
              }
            },
            function(err, result) {

              sendTask(res);

            }
          );

        } // end else

      }

    );

  } // end pullAndPush

});

module.exports = router;

function sendTask(res) {
  User.find({}, function(err, result){
    res.json(
      (result.length === 0) ? result : result[0].tasks
    );
  });
}
