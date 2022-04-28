const Joi = require('joi');
const { Op } = require('@sequelize/core');
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
		if (obj.email) {
			const exist = await service.findOne({
				where: {
					id: { [Op.ne]: obj.id || null },
					name: obj.name,
				},
			});

			if (exist) {
				throw new Error('Producto registrado');
			}
		}
	});

module.exports = {
	checkProductUniqueName,
	createProductSchema,
	updateProductSchema,
	getProductSchema,
};
