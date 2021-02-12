var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/model.user')

function authenticateUser() {
  passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // find a user in the db
    User.findOne({ email: email }).then((user, err) => {
      if (err) throw new Error;
      if (!user) {
        return done(null, false, { message: "User with that email does not exist" })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) { return done(null, user) }
        else { return done(null, false, { message: 'Incorrect password' }) }
      })
    }).catch(err => {
      console.log(err)
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = authenticateUser()