const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');

const {
	createOrderItemSchema,
	updateOrderItemSchema,
	getOrderItemSchema,
} = require('../schemas/order-item.schema');

const ProductService = require('../services/product.service');
const serviceProduct = new ProductService();

const OrderItemService = require('../services/order-item.service');
const service = new OrderItemService();

const OrderService = require('../services/order.service');
const serviceOrder = new OrderService();

router.get(
	'/:id',
	validatorHandler(getOrderItemSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const orderItem = await service.findByPk(id);
			res.json(orderItem);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createOrderItemSchema, 'body'),
	async (req, res, next) => {
		const body = req.body;

		try {
			const orderItem = await service.create(body);
			res.status(201).json(orderItem);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getOrderItemSchema, 'params'),
	validatorHandler(updateOrderItemSchema, 'body'),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		await serviceOrder.findByPk(body.orderId);
		await serviceProduct.findByPk(body.productId);

		try {
			const orderItem = await service.update(id, body);

			res.json(orderItem);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getOrderItemSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const result = await service.delete(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
