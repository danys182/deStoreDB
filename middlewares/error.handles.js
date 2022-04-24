const logger = require('./../libs/winston.createLogger');
const { ValidationError } = require('@sequelize/core');

function errorHandler(err, req, res, next) {
	logger.error(`${err.name} - ${err.message} - ${err.stack}`);

	return res.status(500).json({
		message: 'Error interno',
		statusCode: 500,
	});
}

function sequelizeErrorHandler(err, req, res, next) {
	logger.error(`${err.name} - ${err.message} - ${err.stack}`);

	return res.status(409).json({
		message: err.name,
		statusCode: 409,
	});
}

function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		if (output.statusCode.toString().match(/^4/))
			return res.status(output.statusCode).json(output.payload);
	}
	next(err);
}

module.exports = { sequelizeErrorHandler, errorHandler, boomErrorHandler };
