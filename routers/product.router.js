const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const validatorRequestHandler = require('../middlewares/validator.request.handler');
const {
	checkProductUniqueName,
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProducts,
} = require('../schemas/products.schema');

const ProductService = require('../services/product.service');
const service = new ProductService();

router.get(
	'/',
	validatorHandler(queryProducts, 'query'),
	async (req, res, next) => {
		try {
			const products = await service.getAll(req.query);
			res.json(products);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const product = await service.findByPk(id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createProductSchema, 'body'),
	validatorRequestHandler(checkProductUniqueName),
	async (req, res, next) => {
		const body = req.body;
		try {
			const newProduct = await service.create(body);
			res.status(201).json(newProduct);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	validatorRequestHandler(checkProductUniqueName),
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
