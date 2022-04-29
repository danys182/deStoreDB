const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');

const {
	createOrderSchema,
	updateOrderSchema,
	getOrderSchema,
} = require('../schemas/order.schema');

const OrderService = require('../services/order.service');
const service = new OrderService();

const CustomerService = require('../services/customer.service');
const serviceCustomer = new CustomerService();

const selectOutput = {
	attributes: ['id', 'total'],
	include: [
		{
			association: 'customer',
			attributes: ['id', 'name', 'lastName'],
		},
		{
			association: 'items',
			include: {
				association: 'product',
				attributes: ['id', 'name'],
				include: [
					{
						association: 'category',
						attributes: ['id', 'name'],
					},
				],
			},
		},
	],
};

router.get('/', async (req, res, next) => {
	try {
		const order = await service.getAll(selectOutput);
		res.json(order);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const order = await service.findByPk(id, selectOutput);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		const body = req.body;

		try {
			await serviceCustomer.findByPk(body.customerId);

			const order = await service.create(body);
			res.json(order);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getOrderSchema, 'params'),
	validatorHandler(updateOrderSchema, 'body'),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		try {
			const order = await service.update(id, body);

			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getOrderSchema, 'params'),
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