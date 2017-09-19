const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  wishlist_id: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

const model = mongoose.model('Wishlist', wishlistSchema)

module.exports = model;
