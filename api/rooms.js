const express = require('express');
const rooms = require('../mock/rooms.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    rooms: rooms
  })
})


module.exports = router;
