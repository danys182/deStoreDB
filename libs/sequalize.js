const { Sequelize } = require('@sequelize/core');
const { config } = require('./../config/config');
const logger = require('./winston.createLogger');

const setUpModels = require('../db/models/index');

const sequelize = new Sequelize(config.dbUrl, {
	dialect: 'mysql',
	logging: (msg) => logger.debug(msg),
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

setUpModels(sequelize);

module.exports = sequelize;
