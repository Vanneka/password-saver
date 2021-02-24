const mongoose = require('mongoose');

const passwordDetailsSchema = new mongoose.Schema({
    password: {
        type: String
    },
    passUrl: {
        type: String
    }
})

const userSchema = new mongoose.Schema({
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
        default: Date.now
    },

    passwordDetails: passwordDetailsSchema

})
const User = mongoose.model('usersCollection', userSchema);

module.exports = User;