const express = require('express');
const Show = require('../models/show')
const Room = require('../models/room')
const User = require('../models/user')
// const shows = require('../mock/shows.json');

const router = express.Router();

router.get('/', (req, res, next) => {
  Show.find({})
  .populate('room_id')
  .then(function (shows) {
    res.send(shows)
  })
})

router.get('/:id', (req, res, next) => {
  Show.findOne({_id: req.params.id})
    .populate('room_id')
    .populate('booker_id')
    .populate('wishlist')
    .then(function (show) {
      res.send(show);
    })
})

router.post('/', (req, res, next) => {
  Show.create(req.body).then(function (show) {
    res.send(show);
  }).catch(next);
})

router.put('/:id', (req, res, next) => {
  Show.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function () {
      Show.findOne({_id: req.params.id})
        .then(function (show) {
          res.send(show);
      })
    }).catch(next);
})

router.delete('/:id', (req, res, next) => {
  Show.findByIdAndRemove({_id: req.params.id})
    .then(function (show) {
      res.send(show)
    })
})

module.exports = router;
