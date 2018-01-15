const express = require('express');
const actions = require('../actions/basket');
const router = express.Router();

router.get('/orders', (req, res) => {
  const { session } = req;
  session.userData = { login: 'AngGel', name: 'Angelina', surname: 'Gelmut', id: 1, status: 'customer' };
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

router.get('/', (req, res) => {
  const { session } = req;
  session.userData = { login: 'AngGel', name: 'Angelina', surname: 'Gelmut', id: 1, status: 'customer' };
  actions.getActiveOrder(session.userData.id)
    .then(result => {
      session.page = '/basket';
      session.title = 'basket';
      if (result.status) {
        res.render('index', { ...session, userBasket: result.data });
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

module.exports = router;
