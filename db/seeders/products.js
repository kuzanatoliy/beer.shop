const up = queryInterface => {
  return queryInterface.bulkInsert('Products', [{
    id: 1,
    name: 'Beer dark',
    manufacture: 'Henkel',
    type_id: 1
  }, {
    id: 2,
    name: 'Beer light',
    manufacture: 'Henkel',
    type_id: 1
  }, {
    id: 3,
    name: 'Butterbeer light',
    manufacture: 'Henkel',
    type_id: 2
  }, {
    id: 4,
    name: 'Butterbeer dark',
    manufacture: 'Henkel',
    type_id: 2
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('Products', null, {});
};

module.exports = {
  up,
  down
};
