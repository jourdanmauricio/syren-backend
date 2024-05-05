import Joi from 'joi';

const id = Joi.number();
const name = Joi.string().min(3).max(150);
const email = Joi.string().email();
const birthdate = Joi.date().less('now').allow(null, '');
const nDni = Joi.number().integer().positive();
const username = Joi.string().min(3).max(30);
const password = Joi.string().min(8).max(150);
const token = Joi.string();
const role = Joi.string().allow(null, '');
const image = Joi.string().uri().allow(null, '');
const phone = Joi.string().min(7).max(15).allow(null, '');

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  birthdate,
  nDni: nDni.required(),
  username: username.required(),
  password: password.required(),
  role,
  image,
  phone,
});

const updateUserSchema = Joi.object({
  name,
  email,
  birthdate,
  nDni,
  image,
  phone,
});

const recoveryPassSchema = Joi.object({
  password: password.required(),
  token: token.required(),
});

const changePassSchema = Joi.object({
  password: password.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

export {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  changePassSchema,
  recoveryPassSchema,
};
