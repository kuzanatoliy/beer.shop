const up = queryInterface => {
  return queryInterface.bulkInsert('ProductCounts', [{
    id: 1,
    city_id: 1,
    product_variant_id: 1,
    count: 200
  }, {
    id: 2,
    city_id: 1,
    product_variant_id: 2,
    count: 200
  }, {
    id: 3,
    city_id: 1,
    product_variant_id: 3,
    count: 200
  }, {
    id: 4,
    city_id: 1,
    product_variant_id: 4,
    count: 200
  }, {
    id: 5,
    city_id: 1,
    product_variant_id: 5,
    count: 200
  }, {
    id: 6,
    city_id: 1,
    product_variant_id: 6,
    count: 200
  }, {
    id: 7,
    city_id: 1,
    product_variant_id: 7,
    count: 200
  }, {
    id: 8,
    city_id: 1,
    product_variant_id: 8,
    count: 200
  }, {
    id: 9,
    city_id: 2,
    product_variant_id: 1,
    count: 200
  }, {
    id: 10,
    city_id: 2,
    product_variant_id: 2,
    count: 200
  }, {
    id: 11,
    city_id: 2,
    product_variant_id: 3,
    count: 200
  }, {
    id: 12,
    city_id: 2,
    product_variant_id: 4,
    count: 200
  }, {
    id: 13,
    city_id: 2,
    product_variant_id: 5,
    count: 200
  }, {
    id: 14,
    city_id: 2,
    product_variant_id: 6,
    count: 200
  }, {
    id: 15,
    city_id: 2,
    product_variant_id: 7,
    count: 200
  }, {
    id: 16,
    city_id: 2,
    product_variant_id: 8,
    count: 200
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('ProductCounts', null, {});
};

module.exports = {
  up,
  down
};
