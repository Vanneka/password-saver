const express = require('express');
const router = express.Router();
const passport = require('passport')

// get handler
router.get('/', (req, res) => {
    res.render("../views/login")
})

// post handler
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }) (req, res, next)
})

//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_login', 'You are now logged out')
  res.redirect('/')
})


module.exports = router;