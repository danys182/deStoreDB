const boom = require('@hapi/boom');
const { Order: OrderModel } = require('../db/models/order.model');

class OrderService {
	async getAll(options = {}) {
		return await OrderModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const order = await OrderModel.findByPk(id, options);
		if (!order) {
			throw boom.notFound('Order not found');
		}
		return order;
	}

	async findOne(data, options) {
		return await OrderModel.findOne(data);
	}

	async create(data) {
		return await OrderModel.create(data);
	}

	async update(id, changes, options = null) {
		const order = await this.findByPk(id, options);
		await order.update(changes);
		return order;
	}

	async delete(id) {
		const order = await this.findByPk(id);
		await order.destroy();
		return { id };
	}
}

module.exports = OrderService;
