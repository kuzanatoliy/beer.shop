const {
  Users,
  Cities,
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
const Sequelize = require('sequelize');

const PUT_BASKET_OPTIONS = {
  attributes: ['user_id', 'product_variant_id', 'count']
};

const BASKET_CONTENT_OPTIONS = {
  attributes: ['id'],
  include: {
    model: Baskets,
    attributes: ['id', 'product_variant_id', 'count'],
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

const convertProductVariant = data => ({
  cost: data.cost,
  variant: data.variant.name,
  product: data.product.name,
  type: data.product.product_type.name
});

const convertBasketContent = data => {
  return data[0].baskets.map(item => ({
    id: item.id,
    product_variant_id: item.product_variant_id,
    count: item.count,
    ...convertProductVariant(item.product_variant)
  }));
};

const getBasketContent = async id => {
  let result;
  try {
    result = { status: true, data: convertBasketContent(await Users.findAll({ where: { id }, ...BASKET_CONTENT_OPTIONS })) };
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
    await Baskets.create(params, PUT_BASKET_OPTIONS);
    result = { status: true };
  } catch (err) {
    console.log(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

const GET_ADDRESSES_OPTIONS = {
  attributes: ['id'],
  include: {
    model: UserAddresses,
    attributes: ['id', 'phone', 'street', 'house', 'flat'],
    include: {
      model: Cities,
      attributes: ['name']
    }
  }
};

const convertAddresses = data => {
  return data[0].user_addresses.map(item => ({
    id: item.id,
    phone: item.phone,
    street: item.street,
    house: item.house,
    flat: item.flat,
    city: item.city.name
  }));
};

const getAddresses = async id => {
  let result;
  try {
    result = { status: true, data: convertAddresses(await Users.findAll({ where: { id }, ...GET_ADDRESSES_OPTIONS })) };
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

const GET_ALL_ORDERS_OPTIONS = {
  attributes: ['id'],
  include: {
    model: UserAddresses,
    attributes: ['id'],
    include: {
      model: Orders,
      attributes: ['id', 'date'],
      include: {
        model: OrderStatuses,
        attributes: ['name']
      }
    }
  }
};

const convertOrder = item => ({
  id: item.id,
  date: (item.date)
    ? `${ item.date.getDate() }.${ item.date.getMonth() + 1 }.${ item.date.getFullYear() }`
    : '',
  status: item.order_status.name
});

const convertAllOrders = data => {
  return data[0].user_addresses.reduce((prev, curr) => prev.concat(curr.orders.map(item => convertOrder(item))), []);
};

const getAllOrders = async id => {
  let result;
  try {
    result = { status: true, data: convertAllOrders(await Users.findAll({ where: { id }, ...GET_ALL_ORDERS_OPTIONS })) };
    console.log(result);
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

const createOrder = async (id, goods) => {
  let result;
  try {
    const order = await Orders.create({ user_address_id: id });
    const products = goods.map(item => ({
      order_id: order.id,
      product_variant_id: item.product_variant_id,
      cost: item.cost,
      count: item.count
    }));
    await OrderProducts.bulkCreate(products);
    await Baskets.destroy({ where: { id: { [Sequelize.Op.or]: goods.map(item => item.id) } } });
    result = { status: true };
  } catch (err) {
    console.error(err);
    result = { status: false, message: 'Server error' };
  }
  return result;
};

/*{
  model: OrderProducts,
  attributes: ['order_id', [connection.fn('SUM', connection.col('cost')), 'cost']],
  order: [['cost', 'DESC']]
  group: ['order_id'],
  order: [['cost', 'DESC']]
}*/

module.exports = {
  getBasketContent,
  putBasket,
  getAllOrders,
  getAddresses,
  createOrder
};
