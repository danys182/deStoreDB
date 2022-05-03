const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('./../config/config');
var jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const service = new UserService();

class AuthService {
	async findByEmail(email, password) {
		const user = await service.findOne({
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
		const token = jwt.sign(
			{ sub: user.id, role: user.role },
			config.jwtSecret
		);
		return { user, token };
	}

	async sendMail(email) {
		const user = service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.email',
			port: 465,
			secure: true,
			auth: {
				user: config.emailUser,
				pass: config.emailPassword,
			},
		});

		let info = await transporter.sendMail({
			from: `Fred Foo 👻" <${config.emailUser}>`,
			to: `${user.email}`,
			subject: 'Hello ✔',
			text: 'Hello world?',
			html: '<b>Hello world?</b>',
		});
	}
}

module.exports = AuthService;
