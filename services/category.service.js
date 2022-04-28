const boom = require('@hapi/boom');
const logger = require('../libs/winston.createLogger');
const { Category: CategoryModel } = require('../db/models/category.model');

class CategoryService {
	async getAll(options = {}) {
		return await CategoryModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const category = await CategoryModel.findByPk(id, options);
		if (!category) {
			throw boom.notFound('Category not found');
		}
		return category;
	}

	async findOne(data, options) {
		return await CategoryModel.findOne(data);
	}

	async create(data) {
		return await CategoryModel.create(data);
	}

	async update(id, changes, options = null) {
		const category = await this.findByPk(id, options);
		await category.update(changes);
		return category;
	}

	async delete(id) {
		const category = await this.findByPk(id);
		await category.destroy();
		return { id };
	}
}

module.exports = CategoryService;
