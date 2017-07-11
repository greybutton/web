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

module.exports = router;
