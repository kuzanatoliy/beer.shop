const up = queryInterface => {
  return queryInterface.bulkInsert('UserAddresses', [{
    id: 1,
    user_id: 1,
    city_id: 1,
    phone: '+3752988834556',
    street: 'Internationality',
    house: '12',
    flat: '13'
  }, {
    id: 2,
    user_id: 1,
    city_id: 2,
    phone: '+3752988834556',
    street: 'Big street of worrier',
    house: '15',
    flat: '136'
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('UserAddresses', null, {});
};

module.exports = {
  up,
  down
};
