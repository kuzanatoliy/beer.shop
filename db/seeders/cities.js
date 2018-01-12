const up = queryInterface => {
  return queryInterface.bulkInsert('Cities', [{
    id: 1,
    name: 'Gomel'
  }, {
    id: 2,
    name: 'Minsk'
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('Cities', null, {});
};

module.exports = {
  up,
  down
};
