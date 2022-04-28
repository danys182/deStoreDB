const { User, USER_TABLE_NAME, UserSchema } = require('./user.model');
const {
	Customer,
	CUSTOMER_TABLE_NAME,
	CustomerSchema,
} = require('./customer.model');
const {
	Product,
	PRODUCT_TABLE_NAME,
	ProductSchema,
} = require('./product.model');
const {
	Category,
	CATEGORY_TABLE_NAME,
	CategorySchema,
} = require('./category.model');
const { Order, ORDER_TABLE_NAME, OrderSchema } = require('./order.model');
const {
	OrderItem,
	ORDER_ITEM_TABLE_NAME,
	OrderItemSchema,
} = require('./order-item.model');

function setUpModels(sequelize) {
	User.init(UserSchema, {
		sequelize,
		tableName: USER_TABLE_NAME,
		modelName: 'User',
		timestamps: false,
	});

	Customer.init(CustomerSchema, {
		sequelize,
		tableName: CUSTOMER_TABLE_NAME,
		modelName: 'Customer',
		timestamps: false,
	});

	Product.init(ProductSchema, {
		sequelize,
		tableName: PRODUCT_TABLE_NAME,
		modelName: 'Product',
		timestamps: false,
	});
	Order.init(OrderSchema, {
		sequelize,
		tableName: ORDER_TABLE_NAME,
		modelName: 'Order',
		timestamps: false,
	});
	Category.init(CategorySchema, {
		sequelize,
		tableName: CATEGORY_TABLE_NAME,
		modelName: 'Category',
		timestamps: false,
	});

	OrderItem.init(OrderItemSchema, {
		sequelize,
		tableName: ORDER_ITEM_TABLE_NAME,
		modelName: 'OrderItem',
		timestamps: false,
	});

	Customer.associate(sequelize.models);
	User.associate(sequelize.models);

	Category.associate(sequelize.models);
	Product.associate(sequelize.models);
	Order.associate(sequelize.models);
	OrderItem.associate(sequelize.models);
}

module.exports = setUpModels;
