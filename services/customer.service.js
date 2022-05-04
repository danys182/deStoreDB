const boom = require('@hapi/boom');
const logger = require('../libs/winston.createLogger');
const { Customer: CustomerModel } = require('../db/models/customer.model');

class CustomerService {
	#defaultOptions = {
		include: [{ association: 'user', attributes: ['id', 'email'] }],
	};

	async getAll(options = {}) {
		return await CustomerModel.findAll(this.#defaultOptions);
	}

	async findByPk(id) {
		const customer = await CustomerModel.findByPk(id, { include: 'user' });

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
