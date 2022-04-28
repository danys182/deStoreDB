const Joi = require('joi');
const { Op } = require('@sequelize/core');
const boom = require('@hapi/boom');

const UserService = require('../services/user.service');
const service = new UserService();

const id = Joi.number().integer();
const email = Joi.string().email().required();
const password = Joi.string();
const role = Joi.string();

const createUserSchema = Joi.object({
	email: email,
	password: password.required(),
	role: role.required(),
});

const updateUserSchema = Joi.object({
	email: email.optional(),
	password: password.optional(),
	role: role.optional(),
});

const getUserSchema = Joi.object({
	id: id.required(),
});

const checkUserUniqueEmail = Joi.object({
	id: id.optional(),
	email: email.optional(),
})
	.unknown(true)
	.external(async (obj, helpers) => {
		if (obj.email) {
			const exist = await service.findOne({
				where: {
					id: { [Op.ne]: obj.id || null },
					email: obj.email,
				},
			});
			if (exist) {
				throw boom.badRequest('Email registrado');
			}
		}
	});

module.exports = {
	checkUserUniqueEmail,
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
