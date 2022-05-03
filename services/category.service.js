const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { Category: CategoryModel } = require('../db/models/category.model');

class CategoryService {
	#defaultOptions = { include: ['products'] };
	async getAll() {
		return await CategoryModel.findAll(this.#defaultOptions);
	}

	async findByPk(id) {
		const category = await CategoryModel.findByPk(id, this.#defaultOptions);
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
		const category = await this.findByPk(id);
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
