const up = queryInterface => {
  return queryInterface.bulkInsert('Variants', [{
    id: 1,
    name: '0.33'
  }, {
    id: 2,
    name: '0.5'
  }, {
    id: 3,
    name: '1'
  }, {
    id: 4,
    name: '1.5'
  }, {
    id: 5,
    name: '2'
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('Variants', null, {});
};

module.exports = {
  up,
  down
};
