const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { UserAddresses } = require('./user-addresses');
const { OrderStatuses } = require('./order-statuses');

const params = {
  user_address_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
};

const Orders = connection.define('orders', params, configs);

UserAddresses.hasMany(Orders, { foreignKey: 'user_address_id' });
Orders.belongsTo(UserAddresses, { foreignKey: 'user_address_id' });
OrderStatuses.hasMany(Orders, { foreignKey: 'status_id' });
Orders.belongsTo(OrderStatuses, { foreignKey: 'status_id' });

module.exports = {
  Orders
};
