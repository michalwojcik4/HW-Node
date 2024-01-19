import Joi from "joi";

const validatorUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { validatorUser };
