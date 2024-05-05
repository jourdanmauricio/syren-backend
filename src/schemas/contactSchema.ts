import Joi from 'joi';

const name = Joi.string().min(3).max(150);
const email = Joi.string().email();
const message = Joi.string().min(3).max(255);

const createContactSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  message: message.required(),
});

export { createContactSchema };
