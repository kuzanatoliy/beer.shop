const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');

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
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const Products = connection.define('products', params, configs);

module.exports = {
  Products
};
