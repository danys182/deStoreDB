const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const logger = require('./../libs/winston.createLogger');
const { User: UserModel } = require('../db/models/user.model');

class UserService {
	#defaultOptions = {
		attributes: ['id', 'email', 'role'],
		include: ['customer'],
	};

	async getAll() {
		const users = UserModel.findAll(this.#defaultOptions);
		return await users;
	}

	async findByPk(id) {
		const user = await UserModel.findByPk(id, this.#defaultOptions);
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	async findByEmail(email) {
		return await UserModel.findOne({ where: { email } });
	}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const user = await UserModel.create({ ...data, password: hash });
		delete user.dataValues.password;
		return user;
	}

	async findOne(data) {
		return await UserModel.findOne(data, this.#defaultOptions);
	}

	async update(id, changes) {
		const user = await this.findByPk(id, this.#defaultOptions);
		await user.update(changes);
		delete user.dataValues.password;
		delete user.dataValues.recoveryToken;
		return user;
	}

	async delete(id) {
		const user = await this.findByPk(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
