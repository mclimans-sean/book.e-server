const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time of show is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  room_id: {
    type: Schema.ObjectId,
    ref: 'Room'
  },
  is_clean: Boolean
})

const model = mongoose.model('Show', showSchema)

module.exports = model;
