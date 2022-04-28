const { Sequelize, DataTypes, Model } = require('@sequelize/core');

const CATEGORY_TABLE_NAME = 'categories';

const CategorySchema = {
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
};

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Product, {
			as: 'products',
			foreignKey: 'categoryId',
		});
	}
}

module.exports = { Category, CATEGORY_TABLE_NAME, CategorySchema };
