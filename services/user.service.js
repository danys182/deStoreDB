const boom = require('@hapi/boom');
const logger = require('./../libs/winston.createLogger');
const { User: UserModel } = require('../db/models/user.model');

class UserService {
	async getAll(options = {}) {
		return await UserModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const user = await UserModel.findByPk(id, options);
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	async create(data) {
		return await UserModel.create(data);
	}

	async findOne(data, options) {
		return await UserModel.findOne(data);
	}

	async update(id, changes, options = null) {
		const user = await this.findByPk(id, options);
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
