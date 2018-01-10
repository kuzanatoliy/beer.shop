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

const Variants = connection.define('variants', params, configs);

module.exports = {
  Variants
};
