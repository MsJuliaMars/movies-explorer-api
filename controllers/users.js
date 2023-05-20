const bcrypt = require('bcryptjs'); // модуль для хеширования пароля
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { MESSAGE, STATUS_CODE } = require('../utils/constantsError');
const NotFound = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET } = process.env;

// POST /signup - создаёт пользователя с переданными в теле (email, password и name)
const createUser = (req, res, next) => {
  const {
    name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CODE.OK)
      .send({
        name: user.name,
        email: user.email,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.ERROR_CREATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE.ERROR_CONFLICT_EMAIL));
      } else {
        next(err);
      }
    });
};

// GET /users/me - возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

// PATCH /users/me - обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound(MESSAGE.USER_NOT_FOUND);
    })
    .then((user) => {
      res.status(STATUS_CODE.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.ERROR_UPDATE_PROFILE));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE.ERROR_CONFLICT_UPDATE_EMAIL));
      } else {
        next(err);
      }
    });
};

// POST /signin проверяет переданные в теле почту и пароль и возвращает JWT
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(STATUS_CODE.OK)
        .send({
          message: MESSAGE.SUCCESS_AUTH,
          token,
        });
    })
    .catch(next);
};
module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
