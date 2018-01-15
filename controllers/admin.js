const express = require('express');
const models = require('../db/models');
const action = require('../actions/admin');
const router = express.Router();

const modelsOptions = {
  'cities': {
    model: models.Cities,
    fields: { name: 'Name' }
  },
  'order-statuses': {
    model: models.OrderStatuses,
    fields: { name: 'Name' }
  },
  'product-types': {
    model: models.ProductTypes,
    fields: { name: 'Name' }
  },
  'roles': {
    model: models.Roles,
    fields: { name: 'Name' }
  },
  'variants': {
    model: models.Variants,
    fields: { name: 'Name' }
  },
  'products': {
    model: models.Products,
    fields: { name: 'Name', type_id: 'Type' },
    include: {
      type_id: {
        model: models.productTypes,
        field: 'name'
      }
    }
  }
};

router.post('/:model/add', async (req, res) => {
  const { session } = req;
  const { model } = req.params;
  await action.add(modelsOptions[model].model, req.body);
  res.redirect(`${ session.page }/${ model }`);
});

router.post('/:model/remove/:id', async (req, res) => {
  const { session } = req;
  const { model, id } = req.params;
  await action.remove(modelsOptions[model].model, id);
  res.redirect(`${ session.page }/${ model }`);
});

router.post('/:model/update/:id', async (req, res) => {
  const { session } = req;
  const { model, id } = req.params;
  await action.update(modelsOptions[model].model, id, req.body);
  res.redirect(`${ session.page }/${ model }`);
});

router.get('/:model', async (req, res) => {
  const { session, params } = req;
  try {
    const { model, fields, include } = modelsOptions[params.model];
    session.page += '/model';
    session.title += ` - ${ params.name }`;
    const result = await action.getAll(model);
    
    res.render('index', {
      ...session,
      modelData: { data: result, fields, keys: Object.keys(fields), name: params.model }
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/', (req, res) => {
  const { session } = req;
  session.title += ' - menu';
  res.render('index', { ...session, adminPages: Object.keys(modelsOptions) });
});

module.exports = router;
