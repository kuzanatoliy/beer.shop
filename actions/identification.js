const { Users, Roles } = require('../db/models');

const HAS_OPTIONS = {
  attributes: ['id', 'login', 'name', 'surname'],
  include: {
    model: Roles,
    attributes: ['name']
  }
};
const CREATE_OPTIONS = {
  attributes: ['login', 'name', 'surname', 'password'],
  include: { model: Roles }
};

const errorResults = {
  HAS_ERROR: { status: false, message: 'User not found' },
  CREATE_ERROR: { status: false, message: 'User cannot be created' },
  ERROR: { status: false, message: 'Error' }
};

const hasDataConvert = item => ({
  id: item.id,
  login: item.login,
  name: item.name,
  surname: item.surname,
  role: item.role.name
});

const hasUser = async data => {
  let result;
  try {
    const where = { login: data.login, password: data.password };
    const userData = await Users.findOne({ where, ...HAS_OPTIONS });
    userData
      ? result = { status: true, userData: hasDataConvert(userData) }
      : result = errorResults.HAS_ERROR;
  } catch (err) {
    result = errorResults.ERROR;
    console.error(err);
  }
  return result;
};

const createUser = async data => {
  let result;
  try {
    result = await hasUser(await Users.create(data, CREATE_OPTIONS));
  } catch (err) {
    result = errorResults.ERROR;
    console.error(err);
  }
  return result;
};

module.exports = {
  hasUser,
  createUser
};
