/* eslint no-underscore-dangle: 0 */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

const handleError = (err, res) => {
  res.status(400).send(err);
};

router.get('/', (req, res) => {
  User.distinct('tasks')
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  User.distinct('tasks')
    .then((tasks) => {
      const tasksArr = tasks[1].notImportant.concat(tasks[1].important, tasks[1].daily);
      const task = tasksArr.filter(taskItem => taskItem._id.toString() === _id)[0];
      if (task) {
        res.json({ task });
      } else {
        const err = {
          message: `Cast to ObjectId failed for task value "${_id}" at path "_id" for model "User"`,
          name: 'CastError',
          stringValue: `"${_id}"`,
          kind: 'ObjectId',
          value: _id,
          path: '_id',
        };
        handleError(err, res);
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.post('/', (req, res) => {
  const task = req.body;
  let newTask;
  switch (task.matrixQuater) {
    case 'first':
    case 'second':
      newTask = User.create({
        tasks: {
          important: [task],
        },
      });
      break;
    case 'daily':
      newTask = User.create({
        tasks: {
          daily: [task],
        },
      });
      break;
    default:
      newTask = User.create({
        tasks: {
          notImportant: [task],
        },
      });
      break;
  }
  newTask
    .then((result) => {
      res.json({ tasks: result.tasks });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put('/:_id', (req, res) => {
  const { text, time, sector, matrixQuater } = req.body;
  const _id = req.params._id;
  let label = req.body.label;
  let query = {};
  let doc = {};
  if (!label) {
    label = 'plain';
  }
  switch (matrixQuater) {
    case 'first':
    case 'second':
      query = { 'tasks.important._id': _id };
      doc = {
        'tasks.important.$.text': text,
        'tasks.important.$.time': time,
        'tasks.important.$.sector': sector,
        'tasks.important.$.matrixQuater': matrixQuater,
        'tasks.important.$.label': label,
      };
      break;
    case 'daily':
      query = { 'tasks.daily._id': _id };
      doc = {
        'tasks.daily.$.text': text,
        'tasks.daily.$.time': time,
        'tasks.daily.$.sector': sector,
        'tasks.daily.$.matrixQuater': matrixQuater,
        'tasks.daily.$.label': label,
      };
      break;
    default:
      query = { 'tasks.notImportant._id': _id };
      doc = {
        'tasks.notImportant.$.text': text,
        'tasks.notImportant.$.time': time,
        'tasks.notImportant.$.sector': sector,
        'tasks.notImportant.$.matrixQuater': matrixQuater,
        'tasks.notImportant.$.label': label,
      };
      break;
  }
  const opts = { runValidators: true };
  User.findOneAndUpdate(query, { $set: doc }, opts, (err, result) => {
    if (err) {
      handleError(err, res);
    } else {
      // task changed a matrixQuater
      // not updated because not match any task with new query
      // for example, task became from important to notImportant
      // result is null
      /* eslint no-lonely-if: 1*/
      if (!result) {
        // task updated from notImportant to important
        // task updated from daily to important
        if (matrixQuater === 'first' || matrixQuater === 'second') {
          // delete task from notImportant
          User.update({}, { $pull: { 'tasks.notImportant': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuater,
                label,
              };
              // add task to important
              User.update(
                {},
                {
                  $push: {
                    'tasks.important': {
                      $each: [task],
                      $position: 0,
                    },
                  },
                },
              )
                .then(() => {
                  // send updated tasks
                  User.distinct('tasks')
                    .then((tasks) => {
                      res.json({ tasks: tasks[0] });
                    })
                    .catch((error) => {
                      handleError(error, res);
                    });
                })
                .catch((error) => {
                  handleError(error, res);
                });
            })
            .catch((error) => {
              handleError(error, res);
            });
        }
        // task updated from important to notImportant
        // task updated from daily to notImportant
        if (matrixQuater === 'third' || matrixQuater === 'fourth') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuater,
                label,
              };
              // add task to notImportant
              User.update(
                {},
                {
                  $push: {
                    'tasks.notImportant': {
                      $each: [task],
                      $position: 0,
                    },
                  },
                },
              )
                .then(() => {
                  // send updated tasks
                  User.distinct('tasks')
                    .then((tasks) => {
                      res.json({ tasks: tasks[0] });
                    })
                    .catch((error) => {
                      handleError(error, res);
                    });
                })
                .catch((error) => {
                  handleError(error, res);
                });
            })
            .catch((error) => {
              handleError(error, res);
            });
        }
        // task updated from important to daily
        // task updated from notImportant to daily
        if (matrixQuater === 'daily') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuater,
                label,
              };
              // add task to daily
              User.update(
                {},
                {
                  $push: {
                    'tasks.daily': {
                      $each: [task],
                      $position: 0,
                    },
                  },
                },
              )
                .then(() => {
                  // send updated tasks
                  User.distinct('tasks')
                    .then((tasks) => {
                      res.json({ tasks: tasks[0] });
                    })
                    .catch((error) => {
                      handleError(error, res);
                    });
                })
                .catch((error) => {
                  handleError(error, res);
                });
            })
            .catch((error) => {
              handleError(error, res);
            });
        }
      } else {
        // new model request because in otherwise result with old data
        User.distinct('tasks')
          .then((tasks) => {
            res.json({ tasks: tasks[1] });
          })
          .catch((error) => {
            handleError(error, res);
          });
      }
    }
  });
});

module.exports = router;
