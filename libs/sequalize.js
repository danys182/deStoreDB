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
	}
);

setUpModels(sequelize);
sequelize.sync();

module.exports = sequelize;
