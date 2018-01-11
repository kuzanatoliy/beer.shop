const models = require('../models');

const bulkInsert = (modelId, params) => {
  models[modelId].bulkCreate(params);
};

const bulkDelete = modelId => {
  models[modelId].destroy({ where: {}, truncate: false });
};

module.exports = {
  bulkInsert,
  bulkDelete
};
