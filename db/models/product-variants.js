const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Products } = require('./products');
const { Variants } = require('./variants');

const params = {
  variant_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const ProductVariants = connection.define('product_variants', params, configs);

Products.hasMany(ProductVariants, { foreignKey: 'product_id' });
ProductVariants.belongsTo(Products, { foreignKey: 'product_id' });
Variants.hasMany(ProductVariants, { foreignKey: 'variant_id' });
ProductVariants.belongsTo(Variants, { foreignKey: 'variant_id' });

module.exports = {
  ProductVariants
};
