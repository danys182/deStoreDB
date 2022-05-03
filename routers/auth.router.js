const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.get(
	'/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			res.json(service.signToken(req.user));
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
