const Joi = require('joi');
const { Op } = require('@sequelize/core');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderItemSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required(),
});

const updateOrderItemSchema = Joi.object({
	orderId,
	productId,
	amount,
});

const getOrderItemSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createOrderItemSchema,
	updateOrderItemSchema,
	getOrderItemSchema,
};
