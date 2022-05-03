const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('./../config/config');
var jwt = require('jsonwebtoken');
const { User: AuthModel } = require('../db/models/user.model');

class AuthService {
	async findByEmail(email, password) {
		const user = await AuthModel.findOne({
			where: { email },
		});
		if (!user) {
			throw boom.unauthorized();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password;
		return user;
	}

	signToken(user) {
		console.log(user);
		const token = jwt.sign(
			{ sub: user.id, role: user.role },
			config.jwtSecret
		);
		return { user, token };
	}
}

module.exports = AuthService;
