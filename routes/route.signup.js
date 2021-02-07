const express = require('express');
const router = express.Router()
const User = require('../models/model.user')
const bcrypt = require('bcryptjs')

router.get('/', (req, res)=>{
    res.render("../views/signup")
})

router.post('/', (req, res)=>{
    // collect the data from the user entry
    // validate the entries
    // check if the email already exists in the database
    // if it exists, notify user
    // if it does not, proceed to encrypt the password
    // store the new user
    // redirect to the login page so they can login with username and password
    const { username, email, password, password2 } = req.body

    let errors = []
    // check required fields
    if(!email || !username || !password || !password2){
        errors.push({
          message: "Please fill in all fields"  
        })
    }

    // check that passwords match
    if(password != password2){
        errors.push({ 
            message: 'Passwords do not match' 
        })
    }

    // check password length
    if(password.length<6){
        errors.push({
            message: 'Password must be more than 6 characters'
        })
    }

    if(errors.length > 0){
        // if there is any error passed into the error array, send the details to the signup page ie, the error and the details the user already entered
        res.render('signup', {
            errors,
            username,
            email,
            password,
            password2
        })
    } else {
        // check if the user already exists
        User.findOne({ email : email })
        .then(user=>{
            if(user){
                // user exists
                errors.push({message: 'email is already registered'})
                res.render('signup', {
                    errors,
                    username,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                })
                console.log(newUser)
                res.send('hi')
            }
        })

    }
})
module.exports = router;