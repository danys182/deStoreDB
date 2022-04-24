const boom = require('@hapi/boom');

// function validator(data) {
// 	return async (req, res, next) => {
// 		const id = data.id ? req[data.id[0]][data.id[1]] : null;
// 		const email = req[data.email[0]][data.email[1]];

// 		const exist = await service.findOne({
// 			id: { [Op.ne]: id },
// 			email: email,
// 		});

// 		if (exist) {
// 			return next(boom.badRequest('Email registrado'));
// 		}
// 		next();
// 	};
// }

function validatorEmailUnique(schema) {
	return async (req, res, next) => {
		const data = { email: req['body']['email'], ...req['params'] };
		try {
			await schema.validateAsync(data, { abortEarly: false });
		} catch (err) {
			return next(boom.badRequest(err));
		}

		next();
	};
}

module.exports = validatorEmailUnique;
