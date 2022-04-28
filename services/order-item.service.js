const boom = require('@hapi/boom');
const { OrderItem: OrderItemModel } = require('../db/models/order-item.model');
const ProductService = require('./product.service');
const serviceProduct = new ProductService();

class OrderItemService {
	async getAll(options = {}) {
		return await OrderItemModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const order = await OrderItemModel.findByPk(id, options);
		if (!order) {
			throw boom.notFound('Item not found');
		}
		return order;
	}

	async findOne(data, options) {
		return await OrderItemModel.findOne(data);
	}

	async create(data) {
		const product = await serviceProduct.findByPk(data.productId);
		const price = product.price;

		return await OrderItemModel.create({ ...data, price });
	}

	async update(id, changes, options = null) {
		const item = await this.findByPk(id, options);
		await item.update(changes);
		return item;
	}

	async delete(id) {
		const item = await this.findByPk(id);
		await item.destroy();
		return { id };
	}
}

module.exports = OrderItemService;
