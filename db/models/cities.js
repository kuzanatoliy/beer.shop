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

const Cities = connection.define('cities', params, configs);

module.exports = {
  Cities
};
