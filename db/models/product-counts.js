const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Cities } = require('./cities');
const { ProductVariants } = require('./product-variants');

const params = {
  city_id: {
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
  }
};

const ProductCounts = connection.define('product_counts', params, configs);

Cities.hasMany(ProductCounts, { foreignKey: 'city_id' });
ProductCounts.belongsTo(Cities, { foreignKey: 'city_id' });
ProductVariants.hasMany(ProductCounts, { foreignKey: 'product_variant_id' });
ProductCounts.belongsTo(ProductVariants, { foreignKey: 'product_variant_id' });

module.exports = {
  ProductCounts
};
