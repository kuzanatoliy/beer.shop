const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Users } = require('./users');
const { ProductVariants } = require('./product-variants');

const params = {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_variant_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const Baskets = connection.define('baskets', params, configs);

Users.hasMany(Baskets, { foreignKey: 'user_id' });
Baskets.belongsTo(Users, { foreignKey: 'user_id' });
ProductVariants.hasMany(Baskets, { foreignKey: 'product_variant_id' });
Baskets.belongsTo(ProductVariants, { foreignKey: 'product_variant_id' });

module.exports = {
  Baskets
};
