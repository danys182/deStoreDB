const {
	OrderItemSchema,
	ORDER_ITEM_TABLE_NAME,
} = require('../models/order-item.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			ORDER_ITEM_TABLE_NAME,
			OrderItemSchema
		);
	},

	async down(queryInterface, Sequelize) {},
};
