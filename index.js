const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const configs = require('./configs');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());

app.use('/', (req, res) => {
  res.render('index', configs);
});

app.listen(8888);
