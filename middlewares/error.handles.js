const logger = require('./../utils/winston.createLogger');

function errorHandler(err, req, res, next) {
	logger.error(`${err.stack}`);
	return res.status(500).json({
		message: err.message,
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

module.exports = { errorHandler, boomErrorHandler };
