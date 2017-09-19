const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
// const FacebookTokenStrategy = require('passport-facebook-token');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config()
require('./seeds/rooms.js')

// Configure Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'photo']
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))

// passport.use(new FacebookTokenStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     profileFields: [ "id", "displayName", "email", "picture" ]
//   }, function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({facebookId: profile.id}, function (error, user) {
//       return done(error, user);
//     });
//   }
// ));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId, done);
});

const app = express();

require('./database')


const sessionOptions = {
  secret: 'This is a super secret',
  resave: true,
  saveUninitialized: true,
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connect('mongodb://localhost/joke-e')
  // })
}

app.use(session(sessionOptions));

// Initialize passport
app.use(passport.initialize());

// Restore session
app.use(passport.session());



const users = require('./routes/users')
const auth = require('./routes/auth')
const rooms = require('./routes/rooms')
const shows = require('./routes/shows')

// const port = process.env.PORT || 3000;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}))

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/rooms', rooms);
app.use('/api/shows', shows);

const router = express.Router();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});


module.exports = app;
