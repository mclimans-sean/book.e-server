const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  facebook_id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  profile_pic: String,

  city: String,

  state: String,

  is_comedian: Boolean,
  bio: {
    type: String,
    required: false
  },
  video_url: {
    type: String,
    required: false
  },
  endorser: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  endorsee: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
})

// authenticate input against database documents
userSchema.statics.authenticate = function (email, password, callback) {
  console.log('authenticate', email, password);
  User.findOne({email: email})
    .exec(function (error, user) {
      console.log('find one', error, user);
      if (error) {
        return callback(error);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (error, result) {
        console.log('bcrypt', error, result);
        if (result === true) {
          return callback(null, user);

        } else {
          return callback(error);

        }
      })
    })
}

// hash password before saving to database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User;
