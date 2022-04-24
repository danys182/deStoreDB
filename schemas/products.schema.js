const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const price = Joi.number().positive().precision(2);
const image = Joi.string().uri();
const isBlock = Joi.boolean().default(false);

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image,
	isblock: isBlock,
});

const updateProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image,
	isblock: isBlock,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
