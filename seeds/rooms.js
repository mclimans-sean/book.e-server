const Room = require('../models/room.js');

const rooms = [
  {
    "name": "Comedy Room Room",
    "address": "2104 Larimer St",
    "city": "Denver",
    "state": "CO",
    "zip": 80205
  },
  {
    "name": "Voodoo Comedy Playhouse",
    "address": "1260 22nd St",
    "city": "Denver",
    "state": "CO",
    "zip": 80205
  },
  {
    "name": "Oriental Theater",
    "address": "4335 W 44th Ave",
    "city": "Denver",
    "state": "CO",
    "zip": 80212
  },
  {
    "name": "Oriental Theater",
    "address": "4335 W 44th Ave",
    "city": "Denver",
    "state": "CO",
    "zip": 80212
  },
  {
    "name": "The Bakery",
    "address": "2132 Market St",
    "city": "Denver",
    "state": "CO",
    "zip": 80205
  },
  {
    "name": "The Bakery",
    "address": "2132 Market St",
    "city": "Denver",
    "state": "CO",
    "zip": 80205
  },
  {
    "name": "The Bug Theatre",
    "address": "3654 Navajo St",
    "city": "Denver",
    "state": "CO",
    "zip": 80211
  },
  {
    "name": "Syntax Physic Opera",
    "address": "854 S Broadway",
    "city": "Denver",
    "state": "CO",
    "zip": 80209
  },
  {
    "name": "The Dab Lounge",
    "address": "1532 N Circle Dr",
    "city": "Colorado Springs",
    "state": "CO",
    "zip": 80909
  },
  {
    "name": "The Colorado Room",
    "address": "642 S College Ave",
    "city": "Fort Collins",
    "state": "CO",
    "zip": 80524
  },
  {
    "name": "Ratio Beerworks",
    "address": "2920 Larimer St",
    "city": "Denver",
    "state": "CO",
    "zip": 80205
  }
];

rooms.forEach(function (room, index) {
  Room.find({'name': room}, function (err, rooms) {
    if (!err && !rooms.length) {
      Room.create(room);
    };
  });
});
