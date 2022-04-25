const { USER_TABLE_NAME, UserSchema } = require('../models/user.model');
const {
	PRODUCT_TABLE_NAME,
	ProductSchema,
} = require('../models/product.model');

module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(USER_TABLE_NAME, UserSchema);
		await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(USER_TABLE_NAME);
		await queryInterface.dropTable(PRODUCT_TABLE_NAME);
	},
};
