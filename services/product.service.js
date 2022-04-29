const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequalize');
const { Op } = require('sequelize');
const { Product: ProductModel } = require('./../db/models/product.model');

class ProductsService {
	async getAll(query) {
		const { price, price_min, price_max, limit, offset } = query;
		const options = {
			where: {},
		};
		options.include = ['category'];
		options.limit = +limit || null;
		options.offset = +offset || null;

		if (price) {
			options.where.price = price;
		}

		var priceCondition = [];

		if (price) priceCondition.push({ [Op.eq]: price });
		if (price_min) priceCondition.push({ [Op.gte]: price_min });
		if (price_max) priceCondition.push({ [Op.lte]: price_max });

		options.where.price = { [Op.or]: priceCondition };

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
