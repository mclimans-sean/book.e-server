const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.find({}).then(function (users) {
    res.send(users)
  })
})

router.get('/:id', (req, res, next) => {
  User.findOne({_id: req.params.id})
    .then(function (user) {
      res.send(user);
    })
})

// POST ROUTE TO SIGNUP
router.post('/register', (req, res, next) => {
  User.create(req.body).then(function (user) {
    res.send(user);
  }).catch(next);
})

// POST ROUTE TO LOGIN
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      res.status(401)
      // .json('Wrong email or password');
      return next(new Error('Wrong email or password'));
    } else {
      req.session.id = user._id;
      res.json(user)
    }
  })
})

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function () {
      User.findOne({_id: req.params.id})
        .then(function (user) {
          res.send(user);
      })
    }).catch(next);
})

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove({_id: req.params.id})
    .then(function (user) {
      res.send(user)
    })
})


module.exports = router;
