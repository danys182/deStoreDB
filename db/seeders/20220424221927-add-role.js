const { USER_TABLE_NAME, UserSchema } = require('../models/user.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn(
			USER_TABLE_NAME,
			'role',
			UserSchema.role
		);
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
