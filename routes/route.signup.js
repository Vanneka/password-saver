const express = require('express');
const router = express.Router();
const Joi = require('joi')
const registerationSchema = require('../config/joi.signup')
const User = require('../models/model.user')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.render("../views/signup")
})

router.post('/', (req, res) => {
    const { username, email, password, password2 } = req.body
    console.log(req.body)
    // validate with Joi
    const validationRes = registerationSchema.validate(req.body, {
        abortEarly: false
    })

    // If any errors exist
    if (validationRes.error) {
        let validError = validationRes.error.details;
        res.render('signup', {
            username,
            email,
            password,
            password2,
            validError
        })

    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                let userExistsError = {
                    message: "A user with that email already exists"
                }
                res.render('signup', {
                    username,
                    email,
                    password,
                    password2,
                    userExistsError
                })
            } else {
                const newUser = new User({
                    email,
                    username,
                    password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                      if (err) throw err;
                      newUser.password = hashedPassword
                      newUser.save()
                        .then(user => {
                          req.flash('success_login', 'You have registered successfully and can now login')
                          res.redirect('/login')
                        })
                        .catch(err => console.log(err))
                    })
                  })
            }
        })
    }
})
module.exports = router;

// collect the data from the user entry
// validate the entries
// check if the email already exists in the database
// if it exists, notify user
// if it does not, proceed to encrypt the password
// store the new user
// redirect to the login page so they can login with username and password