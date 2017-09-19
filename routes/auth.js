const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET /auth/login/facebook
router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: ["email"]}));


// GET /auth/facebook/return
router.get('/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
      // Success, redirect to profile page
      res.redirect('/')
    });

// router.post('/facebook/token',(req, res, next) => {
//   passport.authenticate('facebook-token', (error, user, info) => {
//     if (error || !user) {
//       return res.status(401).json({
//         error,
//         info
//       });
//     }
//
//     if (req.sessionID && user) {
//       req.logIn(user, () => {
//         return res.json({
//           sessionId: cookieSignature.sign(req.sessionID, SESSION_SECRET),
//           profile: user.profile
//         })
//       });
//     }
//       next();
//     })(req, res, next);
//   }
// );



// GET /auth/logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
