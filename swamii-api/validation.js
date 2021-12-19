const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(1).email(),
    password: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    username: Joi.string().min(1).required()
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
