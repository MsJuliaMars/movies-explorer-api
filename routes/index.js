const routes = require('express').Router();
const {
  validateUser,
  validateLoginUser,
} = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

// создаёт пользователя с переданными в теле email, password и name
routes.post('/signup', validateUser, createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
routes.post('/signin', validateLoginUser, login);

routes.use(auth);
routes.use('/', usersRouter);
routes.use('/', moviesRouter);

module.exports = routes;
