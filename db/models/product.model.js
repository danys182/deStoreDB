const { Sequelize, DataTypes, Model } = require('@sequelize/core');
const { CATEGORY_TABLE_NAME } = require('./category.model');
const PRODUCT_TABLE_NAME = 'products';

const ProductSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	categoryId: {
		field: 'category_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE_NAME,
			key: 'id',
		},
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

class Product extends Model {
	static associate(models) {
		this.belongsTo(models.Category, { as: 'category' });
	}
}

module.exports = { Product, PRODUCT_TABLE_NAME, ProductSchema };
