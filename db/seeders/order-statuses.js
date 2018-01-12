const up = queryInterface => {
  return queryInterface.bulkInsert('OrderStatuses', [{
    id: 1,
    name: 'completed'
  }, {
    id: 2,
    name: 'delivered'
  }, {
    id: 3,
    name: 'received'
  }, {
    id: 4,
    name: 'canceled'
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('OrderStatuses', null, {});
};

module.exports = {
  up,
  down
};
