const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Users } = require('./users');

const params = {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const UserDiscounts = connection.define('user_discounts', params, configs);

//UserDiscounts.hasMany(Users, { foreignKey: 'user_id' });
//Users.belongsTo(UserDiscounts, { foreignKey: 'user_id' });

module.exports = {
  UserDiscounts
};
