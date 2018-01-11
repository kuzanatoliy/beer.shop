const { Users, Roles } = require('../db/models');

const HAS_ATTRIBUTES = ['id', 'login', 'name', 'surname'];
const CREATE_ATTRIBUTES = ['login', 'name', 'surname', 'password'];

const HAS_ERROR_MESSAGE = 'User not found';

const hasUser = async data => {
  let result;
  try {
    const where = { login: data.login, password: data.password, include: [{ model: Roles }] };
    const userData = await Users.findOne({ where, attributes: HAS_ATTRIBUTES });
    userData
      ? result = { status: true, userData }
      : result = { status: false, message: HAS_ERROR_MESSAGE };
    console.log(result);
  } catch (err) {
    result = { status: false };
    console.log(err);
  }
  return result;
};

const createUser = data => {
  console.log(CREATE_ATTRIBUTES);
};

module.exports = {
  hasUser,
  createUser
};
