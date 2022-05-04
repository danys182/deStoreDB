const Joi = require('joi');

const email = Joi.string().email().required();
const password = Joi.string().required();
const token = Joi.string().required();

const authenticateSchema = Joi.object({
	email,
	password,
});

const recoverySchema = Joi.object({
	email: email.required(),
});

const changeSchema = Joi.object({
	token,
	password,
});

module.exports = { authenticateSchema, recoverySchema, changeSchema };
