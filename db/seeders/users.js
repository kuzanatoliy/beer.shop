const up = queryInterface => {
  return queryInterface.bulkInsert('Users', [{
    id: 1,
    login: 'AngGel',
    name: 'Angelina',
    surname: 'Gelmut',
    password: 'AngGel123',
    role_id: 1
  }, {
    id: 2,
    login: 'managerSasha',
    name: 'Sasha',
    surname: 'Pupkin',
    password: 'ManSasha123',
    role_id: 2
  }, {
    id: 3,
    login: 'admSasha',
    name: 'Sasha',
    surname: 'Pupkin',
    password: 'AdmSasha123',
    role_id: 3
  }], {});
};

const down = queryInterface => {
  return queryInterface.bulkDelete('Users', null, {});
};

module.exports = {
  up,
  down
};
