const express = require('express');
const router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('../models/model.user')


// get handler
router.get('/', (req, res) => {
  res.render("../views/login")
})

// post handler
router.post('/', (req, res, next) => {
  let { email } = req.body
  User.findOne({ email: email }).then((user) => {
    if (!user){
      passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next)
    }
    else {
      passport.authenticate('local', {
        successRedirect: `/dashboard`,
        failureFlash: true
      })(req, res, next)
    }
  }).catch(err=>console.log(err))
})

// /${user.username}

module.exports = router;