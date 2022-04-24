const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequalize');

class ProductsService {
	#products = [];
	constructor() {
		this.#generate();
	}

	#generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.#products.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async getAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				//Simulo petición satisfactoria
				resolve(this.#products);
			}, 100);
		});
	}

	async getById(id) {
		return new Promise((resolve, reject) => {
			const product = this.#products.find((item) => item.id === id);

			if (!product) {
				throw boom.notFound('Product not found');
			}
			if (product.isBlock) {
				throw boom.conflict('Product is block');
			}

			//Se recupera correctamente
			resolve(product);
		});
	}

	async create(data) {
		const newProduct = {
			id: faker.datatype.uuid(),
			...data,
		};

		return new Promise((resolve, reject) => {
			this.#products.push(newProduct);
			//Se almacena correctamente
			resolve(newProduct);
		});
	}

	async update(id, changes) {
		return new Promise((resolve, reject) => {
			const index = this.#products.findIndex((item) => item.id === id);
			if (index === -1) {
				throw boom.notFound('Product not found');
			}
			const product = this.#products[index];

			const newProduct = { ...product, ...changes };
			//Se modifica correctamente
			resolve((this.#products[index] = newProduct));
		});
	}

	async delete(id) {
		return new Promise((resolve, reject) => {
			const index = this.#products.findIndex((item) => item.id === id);
			if (index === -1) {
				throw boom.notFound('Product not found');
			}
			//Se elimina correctamente
			this.#products.splice(index, 1);
			resolve(id);
		});
	}
}

module.exports = ProductsService;
