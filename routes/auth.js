const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET /auth/login/facebook
router.get('/login/facebook',
  passport.authenticate('facebook', {scope: ["email"]}));

// GET /auth/facebook/return
router.get('/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/'}),
    function (req, res) {
      // Success, redirect to profile page
      res.redirect('/profile')
    });

// GET /auth/logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
