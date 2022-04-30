const boom = require('@hapi/boom');
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

	async create(data) {
		return await UserModel.create(data);
	}

	async findOne(data) {
		return await UserModel.findOne(data, this.#defaultOptions);
	}

	async update(id, changes) {
		const user = await this.findByPk(id, this.#defaultOptions);
		await user.update(changes);
		return user;
	}

	async delete(id) {
		const user = await this.findByPk(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
