require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')

const loginRoute = require('./routes/route.login');
const signupRoute = require('./routes/route.signup');

const DB_URI = process.env.DB_URI;

// connect database
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('database connected'))
.catch(err => {
    console.log(`Database could not connect because ${err.message}`)
})
// connect database

// middleware
app.use(express.json())
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(session({
    'secret': process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))
app.use(flash())
// middleware

// Global variable
app.use((req, res, next)=>{
    res.locals.error_login = req.flash('error_login');
    res.locals.success_login = req.flash('success_login');
    next()
})
// Global variable

// routes
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
// routes

// SERVER CODE HERE
app.get('/', (req, res) => {
    res.status(200).render('homepage')
})
// SERVER CODE HERE

// LISTEN HERE
app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`App is listening on port ${PORT}`)
})