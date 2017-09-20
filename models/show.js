const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = require('./user.js')

const showSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },

  date: {
    type: Date,
    required: [true, 'Date is required']
  },

  description: {
    type: String,
    required: [true, 'Description is required']
  },

  room_id: {
    type: Schema.ObjectId,
    ref: 'Room'
  },

  booker_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  is_clean: Boolean,

  interested: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],

  wishlist: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],

  show_lineup: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
})

const model = mongoose.model('Show', showSchema)

module.exports = model;
