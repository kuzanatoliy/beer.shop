const express = require('express');
const actions = require('../actions/goods');
const router = express.Router();

router.get('/:id', (req, res) => {
  actions.getOne(req.params.id)
    .then(result => {
      const { session } = req;
      session.page = '/goods/id';
      session.title = result.data.name;
      if (result.status) {
        res.render('index', { ...session, product: result.data });
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

router.get('/', (req, res) => {
  actions.getAll()
    .then(result => {
      const { session } = req;
      session.page = '/goods';
      session.title = 'goods';
      if (result.status) {
        res.render('index', { ...session, goods: result.data });
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

module.exports = router;
