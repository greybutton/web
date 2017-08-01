/* eslint no-underscore-dangle: 0 */
/* eslint "comma-dangle": ["error", {
  "arrays": "always-multiline",
  "objects": "always-multiline",
  "imports": "always-multiline",
  "exports": "always-multiline",
  "functions": "never"
}] */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

const handleError = (err, res) => {
  res.status(400).send(err);
};

router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      const tasks = result[0] ? result[0].tasks : { daily: [], important: [], notImportant: [] };
      res.json({ tasks });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  User.find({})
    .then((result) => {
      const tasks = result[0] ? result[0].tasks : [];
      if (tasks.length === 0) {
        const err = {
          message: `Cast to ObjectId failed for task value "${_id}" at path "_id" for model "User"`,
          name: 'CastError',
          stringValue: `"${_id}"`,
          kind: 'ObjectId',
          value: _id,
          path: '_id',
        };
        throw err;
      } else {
        const tasksArr = tasks.important.concat(tasks.notImportant, tasks.daily);
        const task = tasksArr.filter(taskItem => taskItem._id.toString() === _id)[0];
        res.json({ task });
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
  switch (task.quadrant) {
    case 'first':
    case 'second':
      User.findOneAndUpdate(
        {},
        { $push: { 'tasks.important': { $each: [task], $position: 0 } } },
        opts
      )
        .then(() => {
          User.find({}).then((result) => {
            const tasks = result[0]
              ? result[0].tasks
              : { daily: [], important: [], notImportant: [] };
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
            const tasks = result[0]
              ? result[0].tasks
              : { daily: [], important: [], notImportant: [] };
            res.json({ tasks });
          });
        })
        .catch((err) => {
          handleError(err, res);
        });
      break;
    default:
      User.findOneAndUpdate(
        {},
        { $push: { 'tasks.notImportant': { $each: [task], $position: 0 } } },
        opts
      )
        .then(() => {
          User.find({}).then((result) => {
            const tasks = result[0]
              ? result[0].tasks
              : { daily: [], important: [], notImportant: [] };
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
  const { text, time, area, quadrant } = req.body;
  const _id = req.params._id;
  let query = {};
  let doc = {};
  switch (quadrant) {
    case 'first':
    case 'second':
      query = { 'tasks.important._id': _id };
      doc = {
        'tasks.important.$.text': text,
        'tasks.important.$.time': time,
        'tasks.important.$.area': area,
        'tasks.important.$.quadrant': quadrant,
      };
      break;
    case 'daily':
      query = { 'tasks.daily._id': _id };
      doc = {
        'tasks.daily.$.text': text,
        'tasks.daily.$.time': time,
        'tasks.daily.$.area': area,
        'tasks.daily.$.quadrant': quadrant,
      };
      break;
    default:
      query = { 'tasks.notImportant._id': _id };
      doc = {
        'tasks.notImportant.$.text': text,
        'tasks.notImportant.$.time': time,
        'tasks.notImportant.$.area': area,
        'tasks.notImportant.$.quadrant': quadrant,
      };
      break;
  }
  const opts = { runValidators: true };
  User.findOneAndUpdate(query, { $set: doc }, opts)
    .then((result) => {
      // task changed a quadrant
      // not updated because not match any task with new query
      // for example, task became from important to notImportant
      // result is null
      /* eslint no-lonely-if: 1*/
      if (!result) {
        // task updated from notImportant to important
        // task updated from daily to important
        if (quadrant === 'first' || quadrant === 'second') {
          // delete task from notImportant
          User.update({}, { $pull: { 'tasks.notImportant': { _id } } }).then(() => {
            const task = {
              text,
              time,
              area,
              quadrant,
            };
            // add task to important
            User.update(
              {},
              { $push: { 'tasks.important': { $each: [task], $position: 0 } } }
            ).then(() => {
              // send updated tasks
              User.find({}).then((result) => {
                const tasks = result[0]
                  ? result[0].tasks
                  : { daily: [], important: [], notImportant: [] };
                res.json({ tasks });
              });
            });
          });
        }
        // task updated from important to notImportant
        // task updated from daily to notImportant
        if (quadrant === 'third' || quadrant === 'fourth') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } }).then(() => {
            const task = {
              text,
              time,
              area,
              quadrant,
            };
            // add task to notImportant
            User.update(
              {},
              { $push: { 'tasks.notImportant': { $each: [task], $position: 0 } } }
            ).then(() => {
              // send updated tasks
              User.find({}).then((result) => {
                const tasks = result[0]
                  ? result[0].tasks
                  : { daily: [], important: [], notImportant: [] };
                res.json({ tasks });
              });
            });
          });
        }
        // task updated from important to daily
        // task updated from notImportant to daily
        if (quadrant === 'daily') {
          // delete task from important
          User.update({}, { $pull: { 'tasks.important': { _id } } }).then(() => {
            const task = {
              text,
              time,
              area,
              quadrant,
            };
            // add task to daily
            User.update(
              {},
              { $push: { 'tasks.daily': { $each: [task], $position: 0 } } }
            ).then(() => {
              // send updated tasks
              User.find({}).then((result) => {
                const tasks = result[0]
                  ? result[0].tasks
                  : { daily: [], important: [], notImportant: [] };
                res.json({ tasks });
              });
            });
          });
        }
      } else {
        // new model request because in otherwise result with old data
        User.find({}).then((result) => {
          const tasks = result[0]
            ? result[0].tasks
            : { daily: [], important: [], notImportant: [] };
          res.json({ tasks });
        });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  User.update({}, { $pull: { 'tasks.important': { _id } } })
    .then((result) => {
      if (result.nModified === 1) {
        // new model request because in otherwise result is object of $pull operator
        User.find({}).then((result) => {
          const tasks = result[0]
            ? result[0].tasks
            : { daily: [], important: [], notImportant: [] };
          res.json({ tasks });
        });
      } else {
        return false;
      }
      return true;
    })
    .then((prev) => {
      if (!prev) {
        User.update({}, { $pull: { 'tasks.notImportant': { _id } } }).then((result) => {
          if (result.nModified === 1) {
            // new model request because in otherwise result is object of $pull operator
            User.find({}).then((result) => {
              const tasks = result[0]
                ? result[0].tasks
                : { daily: [], important: [], notImportant: [] };
              res.json({ tasks });
            });
          } else {
            return false;
          }
          return true;
        });
      }
    })
    .then((prev) => {
      if (!prev) {
        User.update({}, { $pull: { 'tasks.daily': { _id } } }).then((result) => {
          if (result.nModified === 1) {
            // new model request because in otherwise result is object of $pull operator
            User.find({}).then((result) => {
              const tasks = result[0]
                ? result[0].tasks
                : { daily: [], important: [], notImportant: [] };
              res.json({ tasks });
            });
          } else {
            return false;
          }
          return true;
        });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.put('/taskListImportantOrder/:_id', (req, res) => {
  const _id = req.params._id;
  const oldIndex = req.body.indexes.oldIndex;
  const newIndex = req.body.indexes.newIndex;

  User.find({}, {})
    .then((result) => {
      const tasks = result[0].tasks.important;
      const task = tasks.splice(oldIndex, 1);
      return task;
    })
    .then((task) => {
      User.update({}, { $pull: { 'tasks.important': { _id } } }).then(() => {
        User.update(
          {},
          { $push: { 'tasks.important': { $each: task, $position: newIndex } } }
        ).then(() => {
          User.find({}).then((result) => {
            res.json({ tasks: result[0].tasks.important });
          });
        });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put('/taskListDailyOrder/:_id', (req, res) => {
  const _id = req.params._id;
  const oldIndex = req.body.indexes.oldIndex;
  const newIndex = req.body.indexes.newIndex;

  User.find({}, {})
    .then((result) => {
      const tasks = result[0].tasks.daily;
      const task = tasks.splice(oldIndex, 1);
      return task;
    })
    .then((task) => {
      User.update({}, { $pull: { 'tasks.daily': { _id } } }).then(() => {
        User.update(
          {},
          { $push: { 'tasks.daily': { $each: task, $position: newIndex } } }
        ).then(() => {
          User.find({}).then((result) => {
            res.json({ tasks: result[0].tasks.daily });
          });
        });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

module.exports = router;
