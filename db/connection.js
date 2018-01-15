const Sequelize = require('sequelize');
const configs = require('./configs.json');

let connection = null;

const sync = () => {
  return getConnection().sync();
};

const createConnection = () => {
  const { database, username, password, dialect } = configs;
  connection = new Sequelize(database, username, password, { dialect });
};

const getConnection = () => {
  if (!connection) {
    createConnection();
  }
  return connection;
};

const close = () => {
  if (connection) {
    connection.close();
    connection = null;
  }
};

module.exports = {
  getConnection,
  close,
  sync
};
