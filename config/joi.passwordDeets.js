const Joi = require('joi')

const passwordDetailsSchema = new Joi.object({
    passwordInput: Joi.string().required(),
    urlInput: Joi.string().required(),
})

module.exports = passwordDetailsSchema;

// regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/).