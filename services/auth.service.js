const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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
		delete user.dataValues.recoveryToken;
		return user;
	}

	signToken(user) {
		const token = jwt.sign(
			{ sub: user.id, role: user.role },
			config.jwtSecret
		);
		return { user, token };
	}

	async emailRecoveryPassword(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}

		const token = jwt.sign({ sub: user.id }, config.jwtSecretRecovery, {
			expiresIn: '15min',
		});
		const link = `http://frontend.com/token/${token}`;

		const urser = await service.update(user.id, { recoveryToken: token });

		const info = {
			from: `deStore" <${config.emailUser}>`,
			to: `${user.email}`,
			subject: 'Recuperar contraseña',
			html: `<p><b>deStore</b><br />Haz click en el link para recuprar contraseña</p><p>${link}</p>`,
		};
		const rts = this.sendMail(info);
		return rts;
	}

	async changePassword(token, newPassword) {
		try {
			const payload = jwt.verify(token, config.jwtSecretRecovery);

			const user = await service.findByPk(payload.sub);

			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}
			const hash = await bcrypt.hash(newPassword, 10);

			await service.update(user.id, {
				recoveryToken: null,
				password: hash,
			});

			return { message: 'Password chaged' };
		} catch (error) {
			throw boom.unauthorized();
		}
	}

	async sendMail(info) {
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.emailUser,
				pass: config.emailPassword,
			},
		});

		await transporter.sendMail(info);

		return { message: 'Email sent' };
	}
}

module.exports = AuthService;
