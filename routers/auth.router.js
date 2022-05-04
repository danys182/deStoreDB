const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
	authenticateSchema,
	recoverySchema,
	changeSchema,
} = require('../schemas/auth.schema');

const AuthService = require('./../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.get(
	'/login',
	validatorHandler(authenticateSchema, 'body'),
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			res.json(service.signToken(req.user));
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/password/recovery',
	validatorHandler(recoverySchema, 'body'),
	async (req, res, next) => {
		try {
			const { email } = req.body;
			const rta = await service.emailRecoveryPassword(email);
			res.json(rta);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/password/change',
	validatorHandler(changeSchema, 'body'),
	async (req, res, next) => {
		try {
			const { password, token } = req.body;
			const rta = await service.changePassword(token, password);
			res.json(rta);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
