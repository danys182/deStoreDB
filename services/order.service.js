const boom = require('@hapi/boom');
const { Order: OrderModel } = require('../db/models/order.model');
const CustomerService = require('./customer.service');
const serviceCustomer = new CustomerService();

class OrderService {
	#defaultOptions = {
		attributes: ['id', 'total'],
		include: [
			{
				association: 'customer',
				attributes: ['name', 'lastName'],
				include: {
					association: 'user',
					attributes: ['id', 'email'],
				},
			},
			{
				association: 'items',
				include: {
					association: 'product',
					attributes: ['id', 'name'],
				},
			},
		],
	};

	async getAll() {
		return await OrderModel.findAll(this.#defaultOptions);
	}

	async findByPk(id) {
		const order = await OrderModel.findByPk(id);
		if (!order) {
			throw boom.notFound('Order not found');
		}
		return order;
	}

	async findByUserId(userId) {
		const order = await OrderModel.findAll({
			where: {
				'$customer.user.id$': userId,
			},
			...this.#defaultOptions,
		});
		if (!order) {
			throw boom.notFound('Order not found');
		}
		return order;
	}

	async findOne(data, options) {
		return await OrderModel.findOne(data);
	}

	async create(data) {
		const order = await OrderModel.create(data);
		return this.findByPk(order.id);
	}

	async update(id, changes) {
		const order = await this.findByPk(id);
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
