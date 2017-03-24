var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
 * GET sectors
 */
router.get('/', function(req, res) {

  sendSectors(res);

});

/*
 * POST to sector
 */
router.post('/add', function(req, res) {
  var sector = req.body;

  User.findOneAndUpdate(
    {},
    {
      '$push': {
        'sectors': sector
      }
    },
    {upsert: true},
    function (err, result) {

      send(res);

    }
  );

});

/*
 * UPDATE sector
 */
router.put('/update/:id', function(req, res) {
  var sectorToUpdate = req.params.id;
  var update = req.body;
  var query = {'sectors._id': sectorToUpdate};
  var docs = {};

  for (var field in update) {
    docs['sectors.$.' + field] = update[field];
  }

  User.findOneAndUpdate(query, {$set: docs}, function (err, result) {

    send(res);

  });

});

/*
 * UPDATE order
 */
router.put('/updateOrder', function(req, res) {
  var oldIndex = parseInt(req.body.oldIndex);
  var newIndex = parseInt(req.body.newIndex);
  var id = req.body.id;

  User.find({}, {}, pullAndPush);

  function pullAndPush(err, result) {

    var sectors = result[0].sectors;
    var item = sectors.splice(oldIndex, 1);

    User.update(
      {},
      {
        '$pull': {
          'sectors': {
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
                'sectors': {
                  '$each': item,
                  '$position': newIndex
                }
              }
            },
            function(err, result) {

              send(res);

            }
          );

        } // end else

      }

    );

  } // end pullAndPush

});

module.exports = router;

function send(res) {
  User.find({}, function(err, result){
    res.json(result);
  });
}

function sendSectors(res) {
  User.find({}, function(err, result){
    res.json(
      (result.length === 0) ? result : result[0].sectors
    );
  });
}
