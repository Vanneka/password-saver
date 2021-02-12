const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/authEnsure')
const { ensureLoggedIn } = require('../config/authEnsure')

// get the dashboard page
router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {
        name: req.user.username,
        email: req.user.email
    })
})


// logout from your dashboard


module.exports = router