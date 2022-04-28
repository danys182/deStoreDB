const boom = require('@hapi/boom');

function validatorRequestHandler(schema) {
	return async (req, res, next) => {
		const data = { ...req['body'], ...req['params'] };
		try {
			await schema.validateAsync(data, { abortEarly: false });
		} catch (err) {
			return next(boom.badRequest(err));
		}

		next();
	};
}

module.exports = validatorRequestHandler;
