const cities = require('./cities');
const productTypes = require('./product-types');
const roles = require('./roles');
const variants = require('./variants');
const orderStatuses = require('./order-statuses');
const products = require('./products');
const productVariants = require('./product-variants');
const productCounts = require('./product-counts');
const users = require('./users');
const userDiscounts = require('./user-discounts');
const userAddresses = require('./user-addresses');
const orders = require('./orders');
const orderProducts = require('./order-products');

module.exports = {
  cities,
  orders,
  orderProducts,
  orderStatuses,
  productCounts,
  productTypes,
  productVariants,
  products,
  roles,
  userAddresses,
  userDiscounts,
  users,
  variants
};
