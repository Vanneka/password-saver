require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const morgan = require('morgan');
const mongoose = require('mongoose');

const loginRoute = require('./routes/route.login');
const signupRoute = require('./routes/route.signup');

const DB_URI = 'mongodb://localhost/allUsers';

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
// middleware

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