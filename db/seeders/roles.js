const up = queryInterface => {
  queryInterface.bulkInsert('Roles', [{
    id: 1,
    name: 'customers'
  }, {
    id: 2,
    name: 'manager'
  }, {
    id: 3,
    name: 'administrator'
  }], {});
};

const down = queryInterface => {
  queryInterface.bulkDelete('Roles', null, {});
};

module.exports = {
  up,
  down
};
