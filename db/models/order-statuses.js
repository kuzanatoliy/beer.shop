const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');

const params = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
};

const OrderStatuses = connection.define('order_statuses', params, configs);

module.exports = {
  OrderStatuses
};
