const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/joke-e', function (err) {
  if (err) {
    console.log('Failed connecting to MongoDB');
  } else {
    console.log('Successfully connected to MongoDB!!');
  }
});
