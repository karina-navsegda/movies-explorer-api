const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

router.use('/signup', signup);
router.use('/signin', signin);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы нет :С'));
});

module.exports = router;
