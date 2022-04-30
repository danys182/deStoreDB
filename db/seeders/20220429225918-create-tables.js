const { USER_TABLE_NAME, UserSchema } = require('../models/user.model');
const {
	CATEGORY_TABLE_NAME,
	CategorySchema,
} = require('../models/category.model');
const {
	PRODUCT_TABLE_NAME,
	ProductSchema,
} = require('../models/product.model');

const {
	CUSTOMER_TABLE_NAME,
	CustomerSchema,
} = require('../models/customer.model');
const { ORDER_TABLE_NAME, OrderSchema } = require('../models/order.model');
const {
	ORDER_ITEM_TABLE_NAME,
	OrderItemSchema,
} = require('../models/order-item.model');

module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(USER_TABLE_NAME, UserSchema);
		await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerSchema);
		await queryInterface.createTable(CATEGORY_TABLE_NAME, CategorySchema);
		await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema);
		delete OrderSchema.total;
		await queryInterface.createTable(ORDER_TABLE_NAME, OrderSchema);
		await queryInterface.createTable(
			ORDER_ITEM_TABLE_NAME,
			OrderItemSchema
		);
		await queryInterface.createTable(USER_TABLE_NAME, UserSchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(USER_TABLE_NAME);
		await queryInterface.dropTable(CUSTOMER_TABLE_NAME);
		await queryInterface.dropTable(PRODUCT_TABLE_NAME);
		await queryInterface.dropTable(CATEGORY_TABLE_NAME);
		await queryInterface.dropTable(ORDER_TABLE_NAME);
		await queryInterface.dropTable(USER_TABLE_NAME);
	},
};
