const { Sequelize, DataTypes, Model } = require('@sequelize/core');

const PRODUCT_TABLE_NAME = 'products';

const ProductSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'created_at',
		defaultValue: DataTypes.NOW,
	},
};

class Product extends Model {}

module.exports = { Product, PRODUCT_TABLE_NAME, ProductSchema };
