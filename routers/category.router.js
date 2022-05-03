const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const validatorRequestHandler = require('../middlewares/validator.request.handler');
const {
	checkUniqueName,
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
} = require('../schemas/category.schema');

const CategoryService = require('../services/category.service');
const service = new CategoryService();

router.get('/', async (req, res, next) => {
	try {
		const category = await service.getAll();
		res.json(category);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const category = await service.findByPk(id);
			res.json(category);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createCategorySchema, 'body'),
	validatorRequestHandler(checkUniqueName),
	async (req, res, next) => {
		const body = req.body;

		try {
			const category = await service.create(body);
			res.json(category);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	validatorHandler(updateCategorySchema, 'body'),
	validatorRequestHandler(checkUniqueName),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		try {
			const category = await service.update(id, body);

			res.json(category);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
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
