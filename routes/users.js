const express = require('express');
const User = require('../models/user')

const router = express.Router();

// router.get('/profile', (req, res) => {
//   if (req.user) {
//     res.render('profile', {title: 'Profile', user: req.user})
//   } else {
//     res.redirect('/login')
//   }
// });
//
// // GET login page
// router.get('/login', (req, res) => {
//   res.render('login', {title: 'Login', user: req.user})
// })


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

router.post('/', (req, res, next) => {
  User.create(req.body).then(function (user) {
    res.send(user);
  }).catch(next);
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
