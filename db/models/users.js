const Sequelize = require('sequelize');
const provider = require('../connection');
const connection = provider.getConnection();
const configs = require('./configs');
const { Roles } = require('./roles');

const params = {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isValidate: {
      notNull: true,
      notEmpty: true,
      is: /^\w+$/
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    isValidate: {
      notNull: true,
      notEmpty: true,
      is: /^[A-Z]?[a-z]+$/
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    isValidate: {
      notNull: true,
      notEmpty: true,
      is: /^[A-Z]?[a-z]+$/
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    isValidate: {
      notNull: true,
      notEmpty: true,
      is: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
};

const Users = connection.define('users', params, configs);

Roles.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(Roles, { foreignKey: 'role_id' });

module.exports = {
  Users
};
