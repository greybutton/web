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
  const opts = {
    upsert: true,
    runValidators: true,
  };
  switch (task.matrixQuarter) {
    case 'first':
    case 'second':
      // eslint-disable-next-line max-len
      User.findOneAndUpdate({}, { $push: { 'tasks.important': { $each: [task], $position: 0 } } }, opts)
        .then(() => {
          User.find({}).then((result) => {
            const tasks = result[0] ? result[0].tasks : [];
            res.json({ tasks });
          });
        })
        .catch((err) => {
          handleError(err, res);
        });
      break;
    case 'daily':
      User.findOneAndUpdate({}, { $push: { 'tasks.daily': { $each: [task], $position: 0 } } }, opts)
        .then(() => {
          User.find({}).then((result) => {
            const tasks = result[0] ? result[0].tasks : [];
            res.json({ tasks });
          });
        })
        .catch((err) => {
          handleError(err, res);
        });
      break;
    default:
      User.findOneAndUpdate({}, { $push: { 'tasks.notImportant': { $each: [task], $position: 0 } } }, opts)
        .then(() => {
          User.find({}).then((result) => {
            const tasks = result[0] ? result[0].tasks : [];
            res.json({ tasks });
          });
        })
        .catch((err) => {
          handleError(err, res);
        });
      break;
  }
});

router.put('/:_id', (req, res) => {
  const { text, time, sector, matrixQuarter } = req.body;
  const _id = req.params._id;
  let label = req.body.label;
  let query = {};
  let doc = {};
  if (!label) {
    label = 'plain';
  }
  switch (matrixQuarter) {
    case 'first':
    case 'second':
      query = { 'tasks.important._id': _id };
      doc = {
        'tasks.important.$.text': text,
        'tasks.important.$.time': time,
        'tasks.important.$.sector': sector,
        'tasks.important.$.matrixQuarter': matrixQuarter,
        'tasks.important.$.label': label,
      };
      break;
    case 'daily':
      query = { 'tasks.daily._id': _id };
      doc = {
        'tasks.daily.$.text': text,
        'tasks.daily.$.time': time,
        'tasks.daily.$.sector': sector,
        'tasks.daily.$.matrixQuarter': matrixQuarter,
        'tasks.daily.$.label': label,
      };
      break;
    default:
      query = { 'tasks.notImportant._id': _id };
      doc = {
        'tasks.notImportant.$.text': text,
        'tasks.notImportant.$.time': time,
        'tasks.notImportant.$.sector': sector,
        'tasks.notImportant.$.matrixQuarter': matrixQuarter,
        'tasks.notImportant.$.label': label,
      };
      break;
  }
  const opts = { runValidators: true };
  User.findOneAndUpdate(query, { $set: doc }, opts, (err, result) => {
    if (err) {
      handleError(err, res);
    } else {
      // task changed a matrixQuarter
      // not updated because not match any task with new query
      // for example, task became from important to notImportant
      // result is null
      /* eslint no-lonely-if: 1*/
      if (!result) {
        // task updated from notImportant to important
        // task updated from daily to important
        if (matrixQuarter === 'first' || matrixQuarter === 'second') {
          // delete task from notImportant
          User.update({}, { $pull: { 'tasks.notImportant': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuarter,
                label,
              };
              // add task to important
              User.update({}, { $push: { 'tasks.important': { $each: [task], $position: 0 } } })
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
        if (matrixQuarter === 'third' || matrixQuarter === 'fourth') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuarter,
                label,
              };
              // add task to notImportant
              User.update({}, { $push: { 'tasks.notImportant': { $each: [task], $position: 0 } } })
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
        if (matrixQuarter === 'daily') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } })
            .then(() => {
              const task = {
                text,
                time,
                sector,
                matrixQuarter,
                label,
              };
              // add task to daily
              User.update({}, { $push: { 'tasks.daily': { $each: [task], $position: 0 } } })
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

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  User.update({}, { $pull: { 'tasks.important': { _id } } }, (err) => {
    if (err) {
      handleError(err, res);
    } else {
      // new model request because in otherwise result is object of $pull operator
      User.distinct('tasks')
        .then((tasks) => {
          res.json({ tasks: tasks[0] });
        })
        .catch((error) => {
          handleError(error, res);
        });
    }
  });
});

module.exports = router;
