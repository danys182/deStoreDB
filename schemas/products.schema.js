const Joi = require('joi');
const { Op } = require('@sequelize/core');
const { paginationQuerySchema } = require('./pagination.schema');
const ProductService = require('../services/product.service');
const service = new ProductService();

const id = Joi.number().integer();
const name = Joi.string();
const price = Joi.number().positive().precision(2);
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
	categoryId,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

const checkProductUniqueName = Joi.object({
	id: id.optional(),
	name: name.optional(),
})
	.unknown(true)
	.external(async (obj, helpers) => {
		if (obj.name) {
			const exist = await service.findOne({
				where: {
					id: { [Op.ne]: obj.id || null },
					name: obj.name,
				},
			});

			if (exist) {
				throw new Error('Nombre de producto repetido');
			}
		}
	});

const queryProducts = Joi.object({
	price: price.optional(),
	price_min: Joi.number().optional(),
	price_max: Joi.number().optional(),
	...paginationQuerySchema,
});

module.exports = {
	checkProductUniqueName,
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProducts,
};
