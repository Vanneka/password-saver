require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

// passport
const passport = require('passport')
require('./config/passport.config')
// passport

const session = require('express-session')
const flash = require('connect-flash')
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3030;

// routes
const loginRoute = require('./routes/route.login');
const signupRoute = require('./routes/route.signup');
const dashboardRoute = require('./routes/route.dashboard');
const morgan = require('morgan');

// connect databases
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('database connected'))
.catch(err => {
    console.log(`Database could not connect because ${err.message}`)
})
// connect database

// middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.use(morgan('dev'))

app.use(session({
    'secret': process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
// middleware

// Global variable
app.use((req, res, next)=>{
    res.locals.success_login = req.flash('success_login');
    res.locals.error = req.flash('error');
    next()
})
// Global variable

// routes
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/dashboard', dashboardRoute)
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