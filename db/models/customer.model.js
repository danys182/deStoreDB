const { Sequelize, DataTypes, Model } = require('@sequelize/core');
const { USER_TABLE_NAME } = require('./user.model');

const CUSTOMER_TABLE_NAME = 'customers';

const CustomerSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	userId: {
		field: 'user_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: USER_TABLE_NAME,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'last_name',
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'created_at',
		defaultValue: DataTypes.NOW,
	},
};

class Customer extends Model {
	static associate(models) {
		this.belongsTo(models.User, { as: 'user' });
		this.hasMany(models.Order, {
			as: 'orders',
			foreignKey: 'customerId',
		});
	}
}

module.exports = { Customer, CUSTOMER_TABLE_NAME, CustomerSchema };
