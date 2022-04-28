const express = require('express');
const boom = require('@hapi/boom');
const logger = require('./../libs/winston.createLogger');
const productsRouter = require('./product.router');
const usersRouter = require('./user.router');
const customerRouter = require('./customer.router');
const categoryRouter = require('./category.router');
const orderRouter = require('./order.router');
const orderItemRouter = require('./order-item.router');

function routerApi(app) {
	const router = express.Router();

	app.use('/api/v1', router);

	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
	router.use('/customers', customerRouter);
	router.use('/categories', categoryRouter);
	router.use('/orders/items', orderItemRouter);
	router.use('/orders', orderRouter);

	router.use((req, res, next) => {
		logger.http('URL not found: ' + req.url);
		throw boom.notFound('Page not found');
	});
}

module.exports = routerApi;
