import Joi from "joi";

const validatorUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validatorEmail = Joi.object({
  email: Joi.string().email().required(),
});

export { validatorUser, validatorEmail };
