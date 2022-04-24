const express = require('express');
const boom = require('@hapi/boom');
const logger = require('./../libs/winston.createLogger');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function routerApi(app) {
	const router = express.Router();
	//Mi ruta para versión 1
	app.use('/api/v1', router);

	//ruta para módulo productos
	router.use('/products', productsRouter);
	router.use('/users', usersRouter);

	router.use((req, res, next) => {
		logger.http('URL not found: ' + req.url);
		throw boom.notFound('Page not found');
	});
}

module.exports = routerApi;
