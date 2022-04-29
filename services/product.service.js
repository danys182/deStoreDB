const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequalize');
const { Product: ProductModel } = require('./../db/models/product.model');

class ProductsService {
	async getAll(options = {}) {
		options.include = ['category'];
		options.limit = +options.limit || null;
		options.offset = +options.offset || null;

		return await ProductModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const product = await ProductModel.findByPk(id, options);
		if (!product) {
			throw boom.notFound('Product not found');
		}
		return product;
	}

	async findOne(options) {
		return await ProductModel.findOne(options);
	}

	async create(data) {
		return await ProductModel.create(data);
	}

	async update(id, changes, options = {}) {
		const product = await this.findByPk(id, options);
		await product.update(changes);
		return product;
	}

	async delete(id) {
		const product = await this.findByPk(id);
		await product.destroy();
		return { id };
	}
}

module.exports = ProductsService;
