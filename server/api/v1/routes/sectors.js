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

module.exports = router;
