const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interestedSchema = new Schema({
  interested_id: {
    type: Schema.ObjectId,
    ref: 'User'
  }
})

const wishlistSchema = new Schema({
  wishlist_id: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

// wishlistSchema.method("update", function (updates, callback) {
//   Object.assign(this, updates);
//   this.parent().save(callback);
// });

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

  interested: [interestedSchema],

  wishlist: [wishlistSchema]
})

const model = mongoose.model('Show', showSchema)

module.exports = model;
