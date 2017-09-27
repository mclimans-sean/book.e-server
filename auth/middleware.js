const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');

const router = express.Router();

var isAuthorized = function (req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, function (error, decoded) {
      if (error) {
        console.log(error);
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err)
      } else {
        req.user = decoded.name;
        next()
      }
    })
  } else {
    var err = new Error('No token provided');
    err.status = 403;
    next(err)
  }
}

module.exports = {
  isAuthorized
}
