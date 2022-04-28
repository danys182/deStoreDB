const { Sequelize, DataTypes, Model } = require('@sequelize/core');
const { PRODUCT_TABLE_NAME } = require('./product.model');
const { ORDER_TABLE_NAME } = require('./order.model');
const ORDER_ITEM_TABLE_NAME = 'orders_items';

const OrderItemSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	orderId: {
		field: 'order_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: false,
		references: {
			model: ORDER_TABLE_NAME,
			key: 'id',
		},
	},
	productId: {
		field: 'product_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: false,
		references: {
			model: PRODUCT_TABLE_NAME,
			key: 'id',
		},
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
};

class OrderItem extends Model {
	static associate(models) {
		this.belongsTo(models.Product, { as: 'product' });
	}
}

module.exports = { OrderItem, ORDER_ITEM_TABLE_NAME, OrderItemSchema };
