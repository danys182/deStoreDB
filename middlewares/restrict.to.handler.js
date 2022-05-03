const boom = require('@hapi/boom');

function restrictToHandler(roles) {
	return (req, res, next) => {
		const userRole = req.user?.role;
		console.log(userRole), roles;
		const hasRole = roles.includes(userRole);
		if (hasRole) return next();

		next(boom.forbidden('No puede acceder'));
	};
}

module.exports = restrictToHandler;
