const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const identification = require('./controllers/identification');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser());
app.use(session({ secret: 'beer shop' }));

app.use('/', identification);

app.get('/', (req, res) => {
  const { session } = req;
  session.page = '/';
  session.title = 'home';
  res.render('index', { ...session });
});

app.listen(8888);
