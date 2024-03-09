const Joi = require('joi');

const joiUserSchema = Joi.object({
  
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().required(),
    confirm: Joi.string().required(),
});

const joiProductSchema = Joi.object({     
    id:Joi.string(),
    title:Joi.string().required(),
    description:Joi.string(),  
    price:Joi.number().positive(),
    image:Joi.string(),
    category:Joi.string(),
})

module.exports = { joiUserSchema ,joiProductSchema};
