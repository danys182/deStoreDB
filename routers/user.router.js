const express = require('express');
const router = express.Router();
const restrictTo = require('../middlewares/restrict.to.handler');
const validatorHandler = require('../middlewares/validator.handler');
const validatorRequestHandler = require('../middlewares/validator.request.handler');
const {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
	checkUserUniqueEmail,
} = require('../schemas/user.schema');

const UserService = require('../services/user.service');
const service = new UserService();

router.get('/', async (req, res, next) => {
	try {
		const user = await service.getAll();
		res.json(user);
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
			const users = await service.findByPk(id);
			res.json(users);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validatorHandler(createUserSchema, 'body'),
	validatorRequestHandler(checkUserUniqueEmail),
	async (req, res, next) => {
		const body = req.body;

		try {
			const user = await service.create(body);
			res.json(user);
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
	validatorRequestHandler(checkUserUniqueEmail),
	async (req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		try {
			const user = await service.update(id, body);
			res.json(user);
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
			const result = await service.delete(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
