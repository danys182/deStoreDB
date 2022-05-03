const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const AuthService = require('../../../services/auth.service');
const authService = new AuthService();
const LocalStrategy = new Strategy(
	{ usernameField: 'email' },
	async (username, password, done) => {
		const user = await authService.findByEmail(username, password);
		done(null, user);
	}
);

module.exports = LocalStrategy;
