const up = queryInterface => {
  return queryInterface.bulkInsert('UserDiscounts', [{
    id: 1,
    user_id: 1,
    discount: 3
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('UserDiscounts', null, {});
};

module.exports = {
  up,
  down
};
