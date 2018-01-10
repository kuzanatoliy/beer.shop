const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');

const params = {
  variant_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const ProductVariants = connection.define('product_variants', params, configs);

module.exports = {
  ProductVariants
};
