/* eslint no-underscore-dangle: 0 */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

const handleError = (err, res) => {
  res.status(400).send(err);
};

router.get('/', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      handleError(err, res);
    } else {
      res.json(result.length === 0 ? result : result[0].sectors);
    }
  });
});

router.get(':_id', (req, res) => {
  const _id = req.params._id;
  User.findOne({ _id }, (err, sector) => {
    if (err) {
      handleError(err, res);
    } else {
      res.json({ sector });
    }
  });
});

module.exports = router;
