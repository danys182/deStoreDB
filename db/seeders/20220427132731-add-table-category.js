const { DataTypes } = require('@sequelize/core');
const {
	CATEGORY_TABLE_NAME,
	CategorySchema,
} = require('../models/category.model');
const {
	PRODUCT_TABLE_NAME,
	ProductSchema,
} = require('../models/product.model');

module.exports = {
	async up(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();
		await queryInterface.createTable(
			CATEGORY_TABLE_NAME,
			CategorySchema,
			transaction
		);
		await queryInterface.addColumn(PRODUCT_TABLE_NAME, 'category_id', {
			type: DataTypes.INTEGER,
			references: {
				model: 'categories',
				key: 'id',
			},
		});
	},

	async down(queryInterface) {},
};
