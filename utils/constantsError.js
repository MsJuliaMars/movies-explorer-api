// ответ от сервера (статус-код)
module.exports.STATUS_CODE = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  SERVER_ERROR: 500,
};

// сообщения от сервера
module.exports.MESSAGE = {
  ERROR_CREATE_USER: 'Переданы некорректные данные при создании пользователя',
  ERROR_UPDATE_PROFILE: 'Переданы некорректные данные при обновлении профиля',
  ERROR_UPDATE_AVATAR: 'Переданы некорректные данные при обновлении автара профиля.',
  ERROR_SEARCH_USER: 'Переданы некорректные данные при поиске пользователя по id',
  USER_NOT_FOUND: 'Запрашиваемый пользователь не найден',
  CARD_NOT_FOUND: 'Запрпашиваемый фильм не найдена',
  USER_SERVER_ERROR: 'На сервере произошла ошибка',
  ERROR_CREATE_CARD: 'Переданы некорректные данные при создании фильма',
  ERROR_DELETE_CARD: 'Переданы некорректные данные при удалении фильма',
  ERROR_CREATE_LIKE: 'Передан несуществующий _id фильма',
  ERROR_NOT_LIKE: 'Переданы некорректные данные для постановки/снятии лайка',
  ERROR_CONFLICT_EMAIL: 'Вы пытаетесь зарегистриировать вторую учетную запись на тот же email',
  ERROR_CONFLICT_UPDATE_EMAIL: 'Данный email уже существует',
  ERROR_CONFLICT_CARD: 'Вы пытветесь удалить фильм другого пользователя',
  ERROR_UNAUTHORIZED: 'Необходима авторизация',
  SUCCESS_AUTH: 'Вы успешно автризировались',
  FAIL_AUTH: 'Неправильные почта или пароль',
};
