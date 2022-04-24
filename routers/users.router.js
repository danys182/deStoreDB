const express = require('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const validatorEmailUnique = require('../middlewares/validator.email.unique.handler');
const {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
	checkUserUniqueEmail,
} = require('../schemas/user.schema');

const UserService = require('../services/user.service');
const service = new UserService();

const select = {
	exclude: ['updatedAt', 'createdAt'],
};

router.get('/', async (req, res, next) => {
	try {
		const products = await service.getAll(select);
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	validatorHandler(getUserSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const product = await service.getById(id, select);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createUserSchema, 'body'),
	validatorEmailUnique(checkUserUniqueEmail),
	async (req, res, next) => {
		const body = req.body;

		try {
			const newProduct = await service.create(body);
			res.json(newProduct);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validatorHandler(getUserSchema, 'params'),
	validatorHandler(updateUserSchema, 'body'),
	//validatorEmailUnique(checkUserUniqueEmail),
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
	validatorHandler(getUserSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const result = await service.deleteById(id);
			res.json(result ? id : 0);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
