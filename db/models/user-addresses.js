const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Users } = require('./users');
const { Cities } = require('./cities');

const params = {
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
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

Users.hasMany(UserAddresses, { foreignKey: 'user_id' });
UserAddresses.belongsTo(Users, { foreignKey: 'user_id' });
Cities.hasMany(UserAddresses, { foreignKey: 'city_id' });
UserAddresses.belongsTo(Cities, { foreignKey: 'city_id' });

module.exports = {
  UserAddresses
};
