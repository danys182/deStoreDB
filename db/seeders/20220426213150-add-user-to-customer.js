const { DataTypes } = require('@sequelize/core');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('customers', 'user_id', {
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		});
	},

	async down(queryInterface, Sequelize) {},
};
