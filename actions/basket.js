const { Users, UserAddresses, Orders, OrderStatuses, OrderProducts, ProductVariants, Products, ProductTypes, Variants } = require('../db/models');
const Sequelize = require('sequelize');
const { getConnection } = require('../db/connection');
const connection = getConnection();

const GET_ALL_ORDERS_OPTIONS = {
  attributes: ['id'],
  include: {
    model: UserAddresses,
    attributes: ['id'],
    include: {
      model: Orders,
      attributes: ['id', 'date'],
      include: [{
        model: OrderStatuses,
        attributes: ['name'],
        where: {
          name: {
            [Sequelize.Op.not]: 'completed'
          }
        }
      }, {
        model: OrderProducts,
        attributes: [[connection.fn('SUM', connection.col('cost')), 'cost']]
      }]
    }
  }
};

const GET_ACTIVE_ORDER_OPTIONS = {
  attributes: ['id'],
  include: {
    model: UserAddresses,
    attributes: ['id'],
    include: {
      model: Orders,
      attributes: ['id', 'date'],
      include: [{
        model: OrderStatuses,
        attributes: ['name'],
        where: {
          name: 'completed'
        }
      }, {
        model: OrderProducts,
        attributes: ['id', 'count', 'cost'],
        include: {
          model: ProductVariants,
          attributes: ['id'],
          include: [{
            model: Variants,
            attributes: ['name']
          }, {
            model: Products,
            attributes: ['id', 'name', 'manufacture'],
            include: {
              model: ProductTypes,
              attributes: ['name']
            }
          }]
        }
      }]
    }
  }
};

const convertOrder = item => ({
  id: item.id,
  date: item.date,
  status: item.order_status.name,
  cost: item.order_products[0].cost
});

const convertProduct = item => ({
  id: item.id,
  count: item.count,
  cost: item.cost,
  variant: item.product_variant.variant.name,
  name: item.product_variant.product.name,
  manufacture: item.product_variant.product.manufacture,
  type: item.product_variant.product.product_type.name
});

const convertProducts = data => {
  return data.map(item => convertProduct(item));
};

const convertAllOrders = data => {
  return data[0].user_addresses.reduce((prev, curr) => prev.concat(curr.orders.map(item => convertOrder(item))), []);
};

const convertUserOrders = data => {
  return data[0].user_addresses.reduce(
    (prev, curr) => prev.concat(curr.orders.reduce(
      (prev, curr) => prev.concat(convertProducts(curr.order_products)), [])), []);
};

const getActiveOrder = async id => {
  let result;
  try {
    result = convertUserOrders(await Users.findAll({ where: { id }, ...GET_ACTIVE_ORDER_OPTIONS }));
    console.log(result);
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

const getAllOrders = async id => {
  let result;
  try {
    result = { status: true, data: convertAllOrders(await Users.findAll({ where: { id }, ...GET_ALL_ORDERS_OPTIONS })) };
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

module.exports = {
  getAllOrders,
  getActiveOrder
};
