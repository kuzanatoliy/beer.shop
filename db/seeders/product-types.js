const up = queryInterface => {
  queryInterface.bulkInsert('ProductTypes', [{
    id: 1,
    name: 'beer'
  }, {
    id: 2,
    name: 'butterbeer'
  }], {});
};

const down = queryInterface => {
  queryInterface.bulkDelete('ProductTypes', null, {});
};

module.exports = {
  up,
  down
};
