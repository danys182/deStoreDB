const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const UserService = require('../../../services/user.service');
const userService = new UserService();
const LocalStrategy = new Strategy(async (username, email, done) => {
	try {
		const user = await userService.findByEmail(email);
		if (!user) {
			done(boom.unauthorized(), false);
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
});

module.exports = LocalStrategy;
