const express = require('express');
const router = express.Router();
const passport = require('passport');



// GET /auth/login/facebook
router.get('/login/facebook',
  passport.authenticate('facebook'));


// GET /auth/facebook/return
router.get('/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
      // Success, redirect to profile page
      res.redirect('/home')
    });



// GET /auth/logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
