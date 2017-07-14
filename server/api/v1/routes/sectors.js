/* eslint no-underscore-dangle: 0 */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

const handleError = (err, res) => {
  res.status(400).send(err);
};

router.get('/', (req, res) => {
  User.distinct('sectors')
    .then((sectors) => {
      res.json({ sectors });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  User.distinct('sectors')
    .then((sectors) => {
      const sector = sectors.filter(sectorItem => sectorItem._id.toString() === _id)[0];
      if (sector) {
        res.json({ sector });
      } else {
        const err = {
          message: `Cast to ObjectId failed for sector value "${_id}" at path "_id" for model "User"`,
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
  const sector = req.body;
  const opts = {
    upsert: true,
    runValidators: true,
  };
  User.update({}, { $push: { sectors: sector } }, opts, (err) => {
    if (err) {
      handleError(err, res);
    } else {
      // new model request because in otherwise result is object of $pull operator
      User.distinct('sectors')
        .then((sectors) => {
          res.json({ sectors });
        })
        .catch((error) => {
          handleError(error, res);
        });
    }
  });
});

router.put('/:_id', (req, res) => {
  const { title, score, desirableScore } = req.body;
  const _id = req.params._id;
  const doc = {
    'sectors.$.title': title,
    'sectors.$.score': score,
    'sectors.$.desirableScore': desirableScore,
  };
  const opts = { runValidators: true };
  User.findOneAndUpdate({ 'sectors._id': _id }, { $set: doc }, opts, (err) => {
    if (err) {
      handleError(err, res);
    } else {
      // new model request because in otherwise result with old data
      User.distinct('sectors')
        .then((sectors) => {
          res.json({ sectors });
        })
        .catch((error) => {
          handleError(error, res);
        });
    }
  });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  User.update({}, { $pull: { sectors: { _id } } }, (err) => {
    if (err) {
      handleError(err, res);
    } else {
      // new model request because in otherwise result is object of $pull operator
      User.distinct('sectors')
        .then((sectors) => {
          res.json({ sectors });
        })
        .catch((error) => {
          handleError(error, res);
        });
    }
  });
});

module.exports = router;
