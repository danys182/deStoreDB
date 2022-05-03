const express = require('express');
const passport = require('passport');
const router = express.Router();

const OrderService = require('../services/order.service');
const service = new OrderService();

router.get('/', async (req, res, next) => {
	try {
		const userId = req.user.sub;
		const orders = await service.findByUserId(userId);
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
