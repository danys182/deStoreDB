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
				attributes: ['id', 'name', 'lastName'],
			},
			{
				association: 'items',
				include: {
					association: 'product',
					attributes: ['id', 'name'],
					include: [
						{
							association: 'category',
							attributes: ['id', 'name'],
						},
					],
				},
			},
		],
	};

	async getAll() {
		return await OrderModel.findAll(this.#defaultOptions);
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
		await serviceCustomer.findByPk(data.customer_id);
		const order = await OrderModel.create(data);
		return this.findByPk(order.id, this.#defaultOptions);
	}

	async update(id, changes) {
		await serviceCustomer.findByPk(changes.customer_id);
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
