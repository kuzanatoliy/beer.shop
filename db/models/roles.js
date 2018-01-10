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

const Roles = connection.define('roles', params, configs);

module.exports = {
  Roles
};
