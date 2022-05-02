const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const logger = require('./../libs/winston.createLogger');
const { User: UserModel } = require('../db/models/user.model');

class UserService {
	#defaultOptions = {
		include: ['customer'],
	};

	async getAll() {
		return await UserModel.findAll(this.#defaultOptions);
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
		const hash = bcrypt.hash(data.password, 10);
		const user = await UserModel.create({ ...data, password: hash });
		delete user.password;
		return user;
	}

	async findOne(data) {
		return await UserModel.findOne(data, this.#defaultOptions);
	}

	async update(id, changes) {
		const user = await this.findByPk(id, this.#defaultOptions);
		const hash = await bcrypt.hash(changes.password, 10);
		await user.update({ ...changes, password: hash });
		delete user.password;
		return user;
	}

	async delete(id) {
		const user = await this.findByPk(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
