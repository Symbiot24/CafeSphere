const Joi = require('joi');
const cafe = require('./models/cafe');

module.exports.cafeSchema = Joi.object({
    cafe: Joi.object({
        cafeName: Joi.string().required(),
        location: Joi.string().required(),
        city: Joi.string().required(),
        contactNo: Joi.number().required().min(10).max(10),
        image: Joi.string().allow("", null),
    }).required()
});