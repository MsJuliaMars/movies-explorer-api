const routes = require('express').Router();
const {
  validateUser,
  validateLoginUser,
} = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

// создаёт пользователя с переданными в теле email, password и name
routes.post('/signup', validateUser, createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
routes.post('/signin', validateLoginUser, login);

module.exports = routes;
