const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const restrictTo = require('../middlewares/restrict.to.handler');
const logger = require('./../libs/winston.createLogger');
const productsRouter = require('./product.router');
const usersRouter = require('./user.router');
const customerRouter = require('./customer.router');
const categoryRouter = require('./category.router');
const orderRouter = require('./order.router');
const orderItemRouter = require('./order-item.router');
const authRouter = require('./auth.router');
const orderMyRouter = require('./order-my.router');
function routerApi(app) {
	const router = express.Router();

	app.use('/api/v1', router);

	router.use(
		'/products',
		passport.authenticate('jwt', { session: false }),
		restrictTo(['admin']),
		productsRouter
	);
	router.use(
		'/users',
		passport.authenticate('jwt', { session: false }),
		usersRouter
	);
	router.use(
		'/customers',
		passport.authenticate('jwt', { session: false }),
		restrictTo(['customer', 'admin']),
		customerRouter
	);
	router.use(
		'/categories',
		passport.authenticate('jwt', { session: false }),
		restrictTo(['admin']),
		categoryRouter
	);

	router.use(
		'/orders/my',
		passport.authenticate('jwt', { session: false }),
		orderMyRouter
	);

	router.use(
		'/orders/items',
		passport.authenticate('jwt', { session: false }),
		restrictTo(['customer', 'admin']),
		orderItemRouter
	);
	router.use(
		'/orders',
		passport.authenticate('jwt', { session: false }),
		restrictTo(['customer', 'admin']),
		orderRouter
	);

	router.use('/auth', authRouter);

	router.use((req, res, next) => {
		logger.http('URL not found: ' + req.url);
		throw boom.notFound('Page not found');
	});
}

module.exports = routerApi;
