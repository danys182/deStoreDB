const Joi = require('joi');
const { Op } = require('@sequelize/core');
const boom = require('@hapi/boom');

const CategoryService = require('../services/category.service');
const service = new CategoryService();

const id = Joi.number().integer();
const name = Joi.string();

const createCategorySchema = Joi.object({
	name: name.required(),
});

const updateCategorySchema = Joi.object({
	name,
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

const checkUniqueName = Joi.object({
	id: id.optional(),
	name: name.optional(),
})
	.unknown(true)
	.external(async (obj, helpers) => {
		if (obj.name) {
			console.log(obj);
			const exist = await service.findOne({
				where: {
					id: { [Op.ne]: obj.id || null },
					name: obj.name,
				},
			});
			if (exist) {
				throw boom.badRequest('Nombre repetido');
			}
		}
	});

module.exports = {
	checkUniqueName,
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
};
