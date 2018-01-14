const { Products, ProductTypes, ProductVariants, Variants } = require('../db/models');

const GET_ALL_OPTIONS = {
  attributes: ['id', 'name'],
  include: {
    model: ProductTypes,
    attributes: ['name']
  }
};

const GET_ONE_OPTIONS = {
  attributes: ['name', 'manufacture'],
  include: {
    model: ProductVariants,
    attributes: ['id', 'cost'],
    include: {
      model: Variants,
      attributes: ['name']
    }
  }
};

const simpleConvert = item => ({
  id: item.id,
  name: item.name,
  type: item.product_type.name
});

const variantConvert = item => ({
  id: item.id,
  cost: item.cost,
  variant: item.variant.name
});

const fullConvert = item => ({
  name: item.name,
  manufacture: item.manufacture,
  variants: item.product_variants.map(item => variantConvert(item))
});

const getAll = async () => {
  let result;
  try {
    const data = await Products.findAll(GET_ALL_OPTIONS)
      .map(item => simpleConvert(item));
    result = { status: true, data };
  } catch (err) {
    result = { status: false, message: 'Server error' };
    console.error(err);
  }
  return result;
};

const getOne = async id => {
  let result;
  try {
    const data = await Products.findOne({ where: { id }, ...GET_ONE_OPTIONS });
    result = data
      ? { status: true, data: fullConvert(data) }
      : { status: false, message: 'Product not found' };
  } catch (err) {
    result = { status: false, message: 'Server error' };
    console.error(err);
  }
  return result;
};

module.exports = {
  getAll,
  getOne
};
