const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');

const params = {
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  house: {
    type: Sequelize.STRING,
    allowNull: false
  },
  flat: {
    type: Sequelize.STRING,
    allowNull: true
  }
};

const UserAddresses = connection.define('user_addresses', params, configs);

module.exports = {
  UserAddresses
};
