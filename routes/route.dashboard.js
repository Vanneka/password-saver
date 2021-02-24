const express = require('express')
const router = express.Router();

const Joi = require('joi')
const passwordDetailsSchema = require('../config/joi.passwordDeets')
const User = require('../models/model.user')

const { ensureAuthenticated } = require('../config/authEnsure')

// get the dashboard page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        username: req.user.username,
        email: req.user.email
    })
    console.log(req.user)
})

// handle post request here
router.post('/',ensureAuthenticated, (req, res) => {
    const { passwordInput, urlInput } = req.body
    const { username, email } = req.user

    const passValidationRes = passwordDetailsSchema.validate(req.body, {
        abortEarly: false
    })
    if (passValidationRes.error) {
        let passValidError = passValidationRes.error.details;
        res.render(`dashboard`, {
            passValidError,
            username,
            email, 
            passwordInput, 
            urlInput
        })
    } else {
        User.findOne({email: email}).then(user=>{
            console.log(user)
        })
    }
})

// logout from your dashboard
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_login', 'You are now logged out')
    res.redirect('/')
})


module.exports = router