const Joi = require('joi');
const { Op } = require('@sequelize/core');

const UserService = require('../services/user.service');
const service = new UserService();

const id = Joi.number();
const email = Joi.string().email().required();
const password = Joi.string();

const createUserSchema = Joi.object({
	email: email,
	password: password.required(),
});

const updateUserSchema = Joi.object({
	email: email.optional(),
	password: password.optional(),
});

const getUserSchema = Joi.object({
	id: id.required(),
});

const checkUserUniqueEmail = Joi.object({
	id: id.optional(),
	email: email.required(),
}).external(async (obj, helpers) => {
	const exist = await service.findOne({
		id: { [Op.ne]: obj.id || null },
		email: obj.email,
	});

	if (exist) {
		throw new Error('Email registrado');
	}
});

module.exports = {
	checkUserUniqueEmail,
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
