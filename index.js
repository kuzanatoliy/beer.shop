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
app.use('/basket', basket);

app.use('/admin', (req, res, next) => {
  const { session } = req;
  session.userData = { id: 3, login: 'admSasha', name: 'Sasha', surname: 'Pupkin', role: 'administrator' };
  //if (!(session.userData && session.userData.role === 'administrator')) {
    session.page = '/admin';
    session.title = 'admin';
    next();
    //res.redirect('/');
  //}
});

app.use('/admin', admin);

app.get('/', (req, res) => {
  const { session } = req;
  session.page = '/';
  session.title = 'home';
  res.render('index', { ...session });
});

app.listen(8888, () => { console.log('Start listening on port 8888'); });
