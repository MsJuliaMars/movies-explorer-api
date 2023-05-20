const routesUsers = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

routesUsers.get('/users/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)
routesUsers.patch('/users/me', validateUpdateUser, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = routesUsers;
