const convertData = item => ({ ...item.dataValues });

const getAll = model => {
  return model.findAll().map(item => convertData(item));
};

const update = (model, id, data) => {
  return model.update(data, { where: { id } });
};

const remove = (model, id) => {
  return model.destroy({ where: { id } });
};

const add = (model, data) => {
  return model.create(data);
};

module.exports = {
  getAll,
  update,
  remove,
  add
};
