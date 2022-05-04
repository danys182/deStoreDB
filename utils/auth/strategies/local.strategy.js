const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const AuthService = require('../../../services/auth.service');
const authService = new AuthService();
const LocalStrategy = new Strategy(
	{ usernameField: 'email' },
	async (username, password, done) => {
		try {
			const user = await authService.findByEmail(username, password);
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
