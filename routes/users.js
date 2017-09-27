const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

router.post('/register', (req, res, next) => {
  User.create(req.body).then(function (user) {
    res.send(user);
  }).catch(next);
})

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec(function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err)
    } else {
      if (bcrypt.compare(password, user.password)) {
        console.log('User found', user);
        res.status(200).json(user)
      } else {
        res.status(401).json('Unauthorized');
      }
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
