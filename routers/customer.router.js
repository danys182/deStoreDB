const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const {
	createCustomerSchema,
	updateCustomerSchema,
	getCustomerSchema,
} = require('../schemas/customer.schema');

const CustomerService = require('../services/customer.service');
const service = new CustomerService();

router.get('/', async (req, res, next) => {
	try {
		const customer = await service.getAll({ include: ['user'] });
		res.json(customer);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	validatorHandler(getCustomerSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const customer = await service.findByPk(id);
			res.json(customer);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createCustomerSchema, 'body'),
	async (req, res, next) => {
		const body = req.body;

		try {
			const newCustomer = await service.create(body);
			res.json(newCustomer);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getCustomerSchema, 'params'),
	validatorHandler(updateCustomerSchema, 'body'),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		try {
			const updatedCustomer = await service.update(id, body);

			res.json(updatedCustomer);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getCustomerSchema, 'params'),
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
