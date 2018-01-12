const up = queryInterface => {
  return queryInterface.bulkInsert('ProductTypes', [{
    id: 1,
    name: 'beer'
  }, {
    id: 2,
    name: 'butterbeer'
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('ProductTypes', null, {});
};

module.exports = {
  up,
  down
};
