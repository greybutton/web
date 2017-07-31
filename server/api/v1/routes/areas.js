/* eslint no-underscore-dangle: 0 */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

const handleError = (err, res) => {
  res.status(400).send(err);
};

router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      const areas = result[0] ? result[0].areas : [];
      res.json({ areas });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  User.find({})
    .then((result) => {
      const areas = result[0] ? result[0].areas : [];
      if (areas.length === 0) {
        const err = {
          message: `Cast to ObjectId failed for area value "${_id}" at path "_id" for model "User"`,
          name: 'CastError',
          stringValue: `"${_id}"`,
          kind: 'ObjectId',
          value: _id,
          path: '_id',
        };
        throw err;
      } else {
        const area = areas.filter(areaItem => areaItem._id.toString() === _id)[0];
        res.json({ area });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.post('/', (req, res) => {
  const area = req.body;
  const opts = {
    upsert: true,
    runValidators: true,
  };
  User.update({}, { $push: { areas: area } }, opts)
    .then(() => {
      // new model request because in otherwise result is object of $pull operator
      User.find({}).then((result) => {
        const areas = result[0] ? result[0].areas : [];
        res.json({ areas });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put('/:_id', (req, res) => {
  const { title, score, desirableScore } = req.body;
  const _id = req.params._id;
  const doc = {
    'areas.$.title': title,
    'areas.$.score': score,
    'areas.$.desirableScore': desirableScore,
  };
  const opts = { runValidators: true };
  User.findOneAndUpdate({ 'areas._id': _id }, { $set: doc }, opts)
    .then(() => {
      // new model request because in otherwise result with old data
      User.find({}).then((result) => {
        const areas = result[0] ? result[0].areas : [];
        res.json({ areas });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  User.update({}, { $pull: { areas: { _id } } })
    .then((result) => {
      // new model request because in otherwise result is object of $pull operator
      User.find({}).then((result) => {
        const areas = result[0] ? result[0].areas : [];
        res.json({ areas });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put('/areaListOrder/:_id', (req, res) => {
  const _id = req.params._id;
  const oldIndex = req.body.indexes.oldIndex;
  const newIndex = req.body.indexes.newIndex;

  User.find({}, {})
    .then((result) => {
      const areas = result[0].areas;
      const area = areas.splice(oldIndex, 1);
      return area;
    })
    .then((area) => {
      User.update({}, { $pull: { areas: { _id } } }).then(() => {
        User.update({}, { $push: { areas: { $each: area, $position: newIndex } } }).then(() => {
          User.find({}).then((result) => {
            const areas = result[0] ? result[0].areas : [];
            res.json({ areas });
          });
        });
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

module.exports = router;
