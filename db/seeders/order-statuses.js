const up = queryInterface => {
  queryInterface.bulkInsert('OrderStatuses', [{
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
  queryInterface.bulkDelete('OrderStatuses', null, {});
};

module.exports = {
  up,
  down
};
