const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/authEnsure')

// get the dashboard page
router.get('/:user', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {
        name: req.user.username,
        email: req.user.email
    })
})


// logout from your dashboard
//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_login', 'You are now logged out')
    res.redirect('/')
  })
  

module.exports = router