const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { ProductTypes } = require('./product-tyeps');

const params = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  manufacture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const Products = connection.define('products', params, configs);

ProductTypes.hasMany(Products, { foreignKey: 'type_id' });
Products.belongsTo(ProductTypes, { foreignKey: 'type_id' });

module.exports = {
  Products
};
