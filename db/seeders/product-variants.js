const up = queryInterface => {
  return queryInterface.bulkInsert('ProductVariants', [{
    id: 1,
    variant_id: 1,
    product_id: 1,
    cost: 200
  }, {
    id: 2,
    variant_id: 2,
    product_id: 1,
    cost: 350
  }, {
    id: 3,
    variant_id: 3,
    product_id: 1,
    cost: 425
  }, {
    id: 4,
    variant_id: 4,
    product_id: 1,
    cost: 560
  }, {
    id: 5,
    variant_id: 1,
    product_id: 2,
    cost: 155
  }, {
    id: 6,
    variant_id: 2,
    product_id: 2,
    cost: 225
  }, {
    id: 7,
    variant_id: 3,
    product_id: 2,
    cost: 305
  }, {
    id: 8,
    variant_id: 4,
    product_id: 2,
    cost: 440
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('ProductVariants', null, {});
};

module.exports = {
  up,
  down
};
