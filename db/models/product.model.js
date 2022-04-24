const { Sequelize, DataTypes, Model } = require('@sequelize/core');

const USER_TABLE_NAME = 'users';

const UserSchema = {
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

class User extends Model {}

module.exports = { User, USER_TABLE_NAME, UserSchema };
