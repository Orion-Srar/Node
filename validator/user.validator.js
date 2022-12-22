const Joi = require('joi');
const regexp = require('../config/regexp.enum')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        age: Joi.number().integer().min(1).max(120),
        phone: Joi.string().regex(regexp.PHONE).required()
    }),

    editUserValidator: Joi.object({
        name: Joi.string().min(2).max(30).optional(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim(),
        age: Joi.number().integer().min(1).max(120).optional(),
    })
}