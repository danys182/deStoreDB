const { Sequelize } = require('@sequelize/core');
const { config } = require('./../config/config');
const logger = require('./winston.createLogger');

const setUpModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const sequelize = new Sequelize(
	`mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
	{
		dialect: 'mysql',
		logging: (msg) => logger.debug(msg),
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
					]);
				});
			},
		},
	}
);

setUpModels(sequelize);

module.exports = sequelize;
