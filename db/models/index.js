const { User, USER_TABLE_NAME, UserSchema } = require('./user.model');

function setUpModels(sequelize) {
	User.init(UserSchema, {
		sequelize,
		tableName: USER_TABLE_NAME,
		modelName: 'User',
		//timestamps: false,
	});
}

module.exports = setUpModels;
