const { DataTypes } = require('@sequelize/core');
const { CUSTOMER_TABLE_NAME } = require('../models/customer.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint(CUSTOMER_TABLE_NAME, {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'customer_user_id_fid',
			references: {
				table: 'users',
				field: 'id',
			},
		});
	},

	async down(queryInterface, Sequelize) {},
};
