const up = queryInterface => {
  return queryInterface.bulkInsert('OrderProducts', [{
    id: 1,
    order_id: 1,
    product_variant_id: 1,
    count: 1,
    cost: 200
  }, {
    id: 2,
    order_id: 2,
    product_variant_id: 1,
    count: 1,
    cost: 200
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('OrderProducts', null, {});
};

module.exports = {
  up,
  down
};
