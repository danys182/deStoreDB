const { Sequelize, DataTypes, Model } = require('@sequelize/core');

const USER_TABLE_NAME = 'users';

const UserSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'customer',
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'created_at',
		defaultValue: DataTypes.NOW,
	},
};

class User extends Model {
	static associate(models) {
		this.hasOne(models.Customer, {
			as: 'customer',
			foreignKey: 'userId',
		});
	}
}

module.exports = { User, USER_TABLE_NAME, UserSchema };
