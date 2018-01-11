const up = queryInterface => {
  queryInterface.bulkInsert('Cities', [{
    id: 1,
    name: 'beer'
  }, {
    id: 2,
    name: 'butterbeer'
  }], {});
};

const down = queryInterface => {
  queryInterface.bulkDelete('Cities', null, {});
};

module.exports = {
  up,
  down
};
