const boom = require('@hapi/boom');
const logger = require('./../libs/winston.createLogger');
const { User: UserModel } = require('../db/models/user.model');

class UserService {
	#camposExcluidos = null;

	camposExcluidos(campos) {
		this.#camposExcluidos = campos;
	}

	async getAll(select, options = null) {
		const user = await UserModel.findAll({ attributes: select });
		return user;
	}

	async getById(id, select = null, options = null) {
		console.log(options);
		const user = await UserModel.findAll({
			where: { id: id },
			attributes: select,
		});
		if (!user.length) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	async create(data) {
		const newUser = await UserModel.create(data);
		return newUser;
	}

	async findOne(data, options) {
		return await UserModel.findOne({
			where: data,
			rejectOnEmpty: options?.rejectOnEmpty,
		});
	}

	async update(id, changes) {
		await this.getById(id);
		delete changes.id;
		return await UserModel.update(changes, { where: { id: id } });
	}

	async delete(data) {
		await this.#destroy(data);
	}

	async deleteById(id) {
		return await UserModel.destroy({ where: { id: id } });
	}

	async #destroy(data) {
		const result = await this.findOne(data);

		if (!result) {
			throw boom.notFound('User not found');
		}

		await UserModel.destroy({ where: data });
		return data;
	}
}

module.exports = UserService;
