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

Orders.hasMany(UserAddresses, { foreignKey: 'user_address_id' });
UserAddresses.belongsTo(Orders, { foreignKey: 'user_address_id' });
Orders.hasMany(OrderStatuses, { foreignKey: 'status_id' });
OrderStatuses.belongsTo(Orders, { foreignKey: 'status_id' });

module.exports = {
  Orders
};
