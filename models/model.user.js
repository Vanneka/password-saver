const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    date_created: {
        type: Date,
        required: true,
        default : Date.now()
    }, 

})

module.exports = mongoose.model('allUsers', User);