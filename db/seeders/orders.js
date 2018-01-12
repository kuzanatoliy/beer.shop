const up = queryInterface => {
  return queryInterface.bulkInsert('Orders', [{
    id: 1,
    user_address_id: 1,
    status_id: 1,
    date: new Date()
  }, {
    id: 2,
    user_address_id: 1,
    status_id: 1,
    date: new Date()
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('Orders', null, {});
};

module.exports = {
  up,
  down
};
