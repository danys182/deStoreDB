const Joi = require('joi');
const boom = require('@hapi/boom');
const { Op } = require('@sequelize/core');
const CustomerService = require('../services/customer.service');
const service = new CustomerService();

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

const checkRegisteredUser = Joi.object({
	id: id,
	userId: userId,
})
	.unknown(true)
	.external(async (obj, helpers) => {
		if (obj.userId) {
			const exist = await service.findOne({
				where: {
					id: { [Op.ne]: obj.id || null },
					user_id: obj.userId,
				},
			});
			if (exist) {
				throw boom.badRequest('Ya existe usuario asignado');
			}
		}
	});

module.exports = {
	checkRegisteredUser,
	createCustomerSchema,
	updateCustomerSchema,
	getCustomerSchema,
};
