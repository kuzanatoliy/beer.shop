const models = require('../models');

const bulkInsert = (modelId, params) => {
  return models[modelId].bulkCreate(params);
};

const bulkDelete = modelId => {
  return models[modelId].destroy({ where: {}, truncate: false });
};

module.exports = {
  bulkInsert,
  bulkDelete
};
