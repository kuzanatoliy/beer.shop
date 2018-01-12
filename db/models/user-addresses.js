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

UserAddresses.hasMany(Users, { foreignKey: 'user_id' });
Users.belongsTo(UserAddresses, { foreignKey: 'user_id' });
UserAddresses.hasMany(Cities, { foreignKey: 'city_id' });
Cities.belongsTo(UserAddresses, { foreignKey: 'city_id' });

module.exports = {
  UserAddresses
};
