const {
  Users,
  UserAddresses,
  Orders,
  OrderStatuses,
  OrderProducts,
  ProductVariants,
  Products,
  ProductTypes,
  Variants,
  Baskets
} = require('../db/models');
const { getConnection } = require('../db/connection');
const connection = getConnection();

const PUT_BASKET = {
  attributes: ['user_id', 'product_variant_id', 'count']
};

const BASKET_CONTENT = {
  attributes: ['id'],
  include: {
    model: Baskets,
    attributes: ['id', 'count'],
    include: {
      model: ProductVariants,
      attributes: ['id', 'cost'],
      include: [{
        model: Variants,
        attributes: ['name']
      }, {
        model: Products,
        attributes: ['id', 'name'],
        include: {
          model: ProductTypes,
          attributes: ['name']
        }
      }]
    }
  }
};

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
        attributes: ['name']
      }, {
        model: OrderProducts,
        attributes: [[connection.fn('SUM', connection.col('cost')), 'cost']]
      }]
    }
  }
};

const convertOrder = item => ({
  id: item.id,
  date: `${ item.date.getDate() }.${ item.date.getMonth() + 1 }.${ item.date.getFullYear() }`,
  status: item.order_status.name,
  cost: item.order_products[0].cost
});

const convertAllOrders = data => {
  return data[0].user_addresses.reduce((prev, curr) => prev.concat(curr.orders.map(item => convertOrder(item))), []);
};

const convertProductVariant = data => ({
  cost: data.cost,
  variant: data.variant.name,
  product: data.product.name,
  type: data.product.product_type.name
});

const convertBasketContent = data => {
  return data[0].baskets.map(item => ({
    id: item.id,
    count: item.count,
    ...convertProductVariant(item.product_variant)
  }));
};

const getBasketContent = async id => {
  let result;
  try {
    result = { status: true, data: convertBasketContent(await Users.findAll({ where: { id }, ...BASKET_CONTENT })) };
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

const putBasket = async (id, data) => {
  let result;
  try {
    const params = {
      user_id: id,
      product_variant_id: data.id,
      count: data.count
    };
    await Baskets.create(params, PUT_BASKET);
    result = { status: true };
  } catch (err) {
    console.log(err);
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
  getBasketContent,
  putBasket,
  getAllOrders
};
