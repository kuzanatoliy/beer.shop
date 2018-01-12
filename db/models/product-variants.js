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

ProductVariants.hasMany(Products, { foreignKey: 'product_id' });
Products.belongsTo(ProductVariants, { foreignKey: 'product_id' });
ProductVariants.hasMany(Variants, { foreignKey: 'variant_id' });
Variants.belongsTo(ProductVariants, { foreignKey: 'variant_id' });

module.exports = {
  ProductVariants
};
