const { Sequelize } = require('@sequelize/core');
const { config } = require('./../config/config');
const logger = require('./winston.createLogger');

const setUpModels = require('../db/models/index');

const sequelize = new Sequelize(config.dbUrl, {
	dialect: 'mysql',
	logging: (msg) => logger.debug(msg),
	ssl: {
		rejectUnauthorized: false,
	},
	hooks: {
		beforeFind: (instance, options) => {
			if (!instance.attributes) {
				instance.attributes = {};
			}
			instance.attributes.exclude = ['createdAt', 'updateAt'];
			instance.include?.map((attr) => {
				if (!attr.attributes) {
					attr.attributes = {};
				}
				return (attr.attributes.exclude = [
					'createdAt',
					'updateAt',
					'password',
				]);
			});
		},
	},
});

setUpModels(sequelize);

module.exports = sequelize;
