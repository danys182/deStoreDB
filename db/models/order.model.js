const { Sequelize, DataTypes, Model } = require('@sequelize/core');
const { CUSTOMER_TABLE_NAME } = require('../models/customer.model');
const ORDER_TABLE_NAME = 'orders';

const OrderSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	customerId: {
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: false,
		references: {
			model: CUSTOMER_TABLE_NAME,
			key: 'id',
		},
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'created_at',
		defaultValue: DataTypes.NOW,
	},
	total: {
		type: DataTypes.VIRTUAL,
		get() {
			if (this.items?.length > 0) {
				return this.items.reduce((total, item) => {
					return total + parseFloat(item.price) * item.amount;
				}, 0);
			}
			return 0;
		},
	},
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer',
		});
		this.hasMany(models.OrderItem, {
			as: 'items',
			foreignKey: 'orderId',
		});
		this.belongsToMany(models.Product, {
			as: 'itemsProduct',
			through: models.OrderItem,
			foreignKey: 'orderId',
			otherKey: 'productId',
		});
	}
}

module.exports = { Order, ORDER_TABLE_NAME, OrderSchema };
