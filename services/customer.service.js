const boom = require('@hapi/boom');
const logger = require('../libs/winston.createLogger');
const { Customer: CustomerModel } = require('../db/models/customer.model');

class CustomerService {
	async getAll(options = {}) {
		return await CustomerModel.findAll(options);
	}

	async findByPk(id, options = null) {
		const customer = await CustomerModel.findByPk(id, options);
		if (!customer) {
			throw boom.notFound('Customer not found');
		}
		return customer;
	}

	async findOne(data, options) {
		return await CustomerModel.findOne(data);
	}

	async create(data) {
		return await CustomerModel.create(data);
	}

	async update(id, changes, options = null) {
		const customer = await this.findByPk(id, options);
		await customer.update(changes);
		return customer;
	}

	async delete(id) {
		const customer = await this.findByPk(id);
		await customer.destroy();
		return { id };
	}
}

module.exports = CustomerService;
