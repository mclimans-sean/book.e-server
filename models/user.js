const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const model = mongoose.model('User', userSchema)

module.exports = model;
