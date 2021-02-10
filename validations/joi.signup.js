const Joi = require('joi')

const registerationSchema = new Joi.object({
    email: Joi.string().trim().lowercase().required(),
    username: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
    password2: Joi.string().required().valid(Joi.ref('password')).error(new Error( 'Passwords must match'))
})

module.exports = registerationSchema;

// .error(new Error( 'Email is required'))