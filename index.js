const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());

app.use('/', (req, res) => {
  res.render('index', {});
});

app.get('/log-in', (req, res) => {
  res.render('index', {});
});

app.get('/sing-up', (req, res) => {
  res.render('index', {});
});

app.listen(8888);
