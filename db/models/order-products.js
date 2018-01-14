const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { ProductVariants } = require('./product-variants');
const { Orders } = require('./orders');

const params = {
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_variant_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const OrderProducts = connection.define('order_products', params, configs);

ProductVariants.hasMany(OrderProducts, { foreignKey: 'product_variant_id' });
OrderProducts.belongsTo(ProductVariants, { foreignKey: 'product_variant_id' });
Orders.hasMany(OrderProducts, { foreignKey: 'order_id' });
OrderProducts.belongsTo(Orders, { foreignKey: 'order_id' });

module.exports = {
  OrderProducts
};
