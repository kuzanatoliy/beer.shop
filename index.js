const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const identification = require('./controllers/identification');
const goods = require('./controllers/goods');
const basket = require('./controllers/basket');
const admin = require('./controllers/admin');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());
app.use(session({ secret: 'beer shop' }));

app.use('/', identification);

app.use('/goods', goods);

app.use('/basket', (req, res, next) => {
  const { session } = req;
  session.userData = { login: 'AngGel', name: 'Angelina', surname: 'Gelmut', id: 1, role: 'customers' };
  if (session.userData && session.userData.role === 'customers') {
    session.page = '/basket';
    session.title = 'basket';
    next();
  } else {
    res.redirect('/');
  }
});

app.use('/basket', basket);

app.use('/admin', (req, res, next) => {
  const { session } = req;
  if (session.userData && session.userData.role === 'administrator') {
    session.page = '/admin';
    session.title = 'admin';
    next();
  } else {
    res.redirect('/');
  }
});

app.use('/admin', admin);

app.get('/', (req, res) => {
  const { session } = req;
  session.page = '/';
  session.title = 'home';
  res.render('index', { ...session });
});

app.listen(8888, () => { console.log('Start listening on port 8888'); });
