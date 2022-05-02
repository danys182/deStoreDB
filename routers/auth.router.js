const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const router = express.Router();

router.get(
	'/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			console.log(user);
			const token = jwt.sign(
				{ userId: user.id, role: user.role },
				config.jwtSecret
			);
			res.json({ user, token });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
