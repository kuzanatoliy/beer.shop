const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const actions = require('./actions/identification');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());
app.use(session({ secret: 'beer shop' }));

app.get('/log-in', (req, res) => {
  res.render('index', { page: '/log-in', title: 'log-in', session: req.session });
});

app.get('/sign-up', (req, res) => {
  res.render('index', { page: '/sign-up', title: 'sign-up', session: req.session });
});

app.post('/log-in', (req, res) => {
  actions.hasUser({ login: 'kuzanatoli', password: '123nilNIL' });
  res.render('index', { page: '/log-in', title: 'log-in', session: req.session });
});

app.post('/sign-up', (req, res) => {
  res.render('index', { page: '/sign-up', title: 'sign-up', session: req.session });
});

app.use('/', (req, res) => {
  res.render('index', { title: 'home', session: req.session });
});

app.listen(8888);
