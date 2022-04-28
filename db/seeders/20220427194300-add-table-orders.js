const { ORDER_TABLE_NAME, OrderSchema } = require('../models/order.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(ORDER_TABLE_NAME, OrderSchema);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
