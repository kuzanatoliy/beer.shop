const express = require('express');
const actions = require('../actions/identification');
const router = express.Router();

router.get('/log-in', (req, res) => {
  const { session } = req;
  session.page = '/log-in';
  session.title = 'log-in';
  res.render('index', { ...req.session });
});

router.get('/sign-up', (req, res) => {
  const { session } = req;
  session.page = '/sign-up';
  session.title = 'sign-up';
  res.render('index', { ...session });
});

router.use('/log-out', (req, res) => {
  req.session.userData = null;
  res.redirect('/');
});

router.post('/log-in', (req, res) => {
  const { session, body } = req;
  console.log(session);
  actions.hasUser(body)
    .then(result => {
      if (result.status) {
        session.userData = result.userData;
        res.redirect('/');
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

router.post('/sign-up', (req, res) => {
  const { session, body } = req;
  actions.createUser(body)
    .then(result => {
      if (result.status) {
        session.userData = result.userData;
        res.redirect('/');
      } else {
        res.render('index', { ...session, message: result.message });
      }
    });
});

module.exports = router;
