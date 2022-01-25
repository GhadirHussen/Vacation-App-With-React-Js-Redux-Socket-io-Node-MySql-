const Joi = require('joi');


const Schema = {
    user : Joi.object({
        userID: Joi.forbidden(),
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        userName: Joi.string().min(4).max(30).required(),
        password: Joi.string().min(4).max(30).required(),
        isAdmin: Joi.boolean().optional(),
    }),

    vacations : Joi.object({
        vacationID: Joi.forbidden(),
        destination: Joi.string().min(3).max(15).required(),
        description: Joi.string().min(5).required(),
        price: Joi.string().min(3).max(4).required(),
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        imageName : Joi.string().not()
    })
    
} 

module.exports = Schema;
