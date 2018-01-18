const express = require('express');
const actions = require('../actions/basket');
const router = express.Router();

router.get('/orders', (req, res) => {
  const { session } = req;
  actions.getAllOrders(session.userData.id)
    .then(result => {
      session.page = '/basket/orders';
      session.title = 'orders';
      if (result.status) {
        res.render('index', { ...session, userOrders: result.data });
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

router.post('/put', (req, res) => {
  const { session, body } = req;
  actions.putBasket(session.userData.id, body)
    .then(result => {
      if (result.status) {
        res.redirect(session.page);
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

router.get('/', (req, res) => {
  const { session } = req;
  actions.getActiveOrder(session.userData.id)
    .then(result => {
      if (result.status) {
        res.render('index', { ...session, userBasket: result.data });
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

module.exports = router;
