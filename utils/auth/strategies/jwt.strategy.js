const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config');
const boom = require('@hapi/boom');
const UserService = require('../../../services/user.service');
const userService = new UserService();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, function (payload, done) {
	return done(null, payload);
});

module.exports = JwtStrategy;
