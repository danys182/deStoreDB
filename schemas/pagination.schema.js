const Joi = require('joi');

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const paginationQuerySchema = {
	limit,
	offset,
};

module.exports = { paginationQuerySchema };
