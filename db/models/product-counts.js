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

ProductCounts.hasMany(Cities, { foreignKey: 'city_id' });
Cities.belongsTo(ProductCounts, { foreignKey: 'city_id' });
ProductCounts.hasMany(ProductVariants, { foreignKey: 'product_variant_id' });
ProductVariants.belongsTo(ProductCounts, { foreignKey: 'product_variant_id' });

module.exports = {
  ProductCounts
};
