const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
	name: name.required(),
	lastName: lastName.required(),
	phone: phone.optional(),
	userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
	name,
	lastName,
	phone,
	userId,
});

const getCustomerSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCustomerSchema,
	updateCustomerSchema,
	getCustomerSchema,
};
