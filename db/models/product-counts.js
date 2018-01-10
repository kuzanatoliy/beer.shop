const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');

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

module.exports = {
  ProductCounts
};
