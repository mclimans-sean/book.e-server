const express = require('express');
const Room = require('../models/room')
// const rooms = require('../mock/rooms.json');

const router = express.Router();

router.get('/', (req, res, next) => {
  Room.find({}).then(function (rooms) {
    res.send(rooms)
  })
})

router.get('/:id', (req, res, next) => {
  Room.findOne({_id: req.params.id})
    .then(function (room) {
      res.send(room);
    })
})

router.post('/', (req, res, next) => {
  Room.create(req.body).then(function (room) {
    res.send(room);
  }).catch(next);
})

router.put('/:id', (req, res, next) => {
  Room.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function () {
      Room.findOne({_id: req.params.id})
        .then(function (room) {
          res.send(room);
      })
    }).catch(next);
})

router.delete('/:id', (req, res, next) => {
  Room.findByIdAndRemove({_id: req.params.id})
    .then(function (room) {
      res.send(room)
    })
})

module.exports = router;
