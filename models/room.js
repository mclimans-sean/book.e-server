const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var roomSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  address: {
    type: String,
    required: [true, 'Address field is required']
  },
  address_2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  zip: Number
})

const model = mongoose.model('Room', roomSchema)

module.exports = model;
