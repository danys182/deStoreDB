const express = require('express');
const router = express.Router();

const validatorHandler = require('./../middlewares/validator.handler');
const {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
} = require('./../dtos/products.dto');

const ProductsServices = require('./../services/products.services');
const service = new ProductsServices();

router.get('/', async (req, res, next) => {
	try {
		const products = await service.getAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const product = await service.getById(id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createProductSchema, 'body'),
	async (req, res, next) => {
		const body = req.body;

		try {
			const newProduct = await service.create(body);
			res.json(newProduct);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		try {
			const newProduct = await service.update(id, body);
			res.json(newProduct);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;

		try {
			const product = await service.delete(id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
