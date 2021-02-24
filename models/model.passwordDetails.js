const mongoose = require('mongoose')

const passwordDetailsSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    }, 
    passUrl: {
        type: String,
        required: true
    }
})

const passwordDetails = mongoose.model('passDeets', passwordDetailsSchema);

module.exports = passwordDetails;