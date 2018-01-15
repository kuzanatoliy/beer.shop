const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const identification = require('./controllers/identification');
const goods = require('./controllers/goods');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());
app.use(session({ secret: 'beer shop' }));

app.use('/', identification);
app.use('/goods', goods);

const actions = require('./actions/basket');

app.get('/basket', (req, res) => {
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

app.get('/basket/orders', (req, res) => {
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

app.get('/', (req, res) => {
  const { session } = req;
  session.page = '/';
  session.title = 'home';
  res.render('index', { ...session });
});

app.listen(8888);
