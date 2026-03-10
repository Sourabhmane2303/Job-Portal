const Joi = require('@hapi/joi');
const authschema = Joi.object({
    email:Joi.string().email().lowercase(),
    password:Joi.string().min(2).required(),


})

module.exports = {
    authschema
}