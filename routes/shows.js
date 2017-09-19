const express = require('express');
const Show = require('../models/show')
const Room = require('../models/room')
const User = require('../models/user')

// const shows = require('../mock/shows.json');

const router = express.Router();

router.param("sID", function (req, res, next, id) {
  Show.findById(id, function (err, doc) {
    if (err) return next(err);
    if(!doc) {
      err = new Error("Not found");
      err.status = 404;
      return next(err);
    }
    req.show = doc;
    return next();
  })
})

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
    .populate({
      path: 'wishlist',
      populate: {
        path: 'wishlist_id',
        model: 'Show'
      }
    })
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

// GET wishlist
// router.get('/:sid/wishlist', (req, res, next) => {
//   req.Show.wishlist.find({})
//     .populate({
//       path: 'wishlist',
//       populate: {
//         path: '_id',
//         model: 'User'
//       }
//     })
//     .then(function (wishlist) {
//       res.send(wishlist);
//     })
// })

// POST to wishlist ****************************
router.post('/:sID/wishlist', (req, res, next) => {
  req.show.wishlist.push(req.body);
  req.show.save(function (err, show) {
    if (err) return next(err);
    res.status(201);
    res.json(show)
    console.log(show);
  })
})

// POST to interested ***************************
router.post('/:sID/interested', (req, res, next) => {
  req.show.interested.push(req.body);
  req.show.save(function (err, show) {
    if (err) return next(err);
    res.status(201);
    res.json(show)
    console.log(show);
  })
})

module.exports = router;
