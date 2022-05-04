const boom = require('@hapi/boom');

function restrictTo(roles) {
	return (req, res, next) => {
		const userRole = req.user?.role;

		const hasRole = roles.includes(userRole);
		if (hasRole) return next();

		next(boom.forbidden('No puede acceder'));
	};
}

module.exports = restrictTo;
