const express = require('express');
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const routes = require('./routes/index');
const routesMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { corsOptions } = require('./utils/corsOptions');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');
const limiter = require('./utils/rateLimit');

// Слушаем 3000 порт
const { PORT = 3001 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {});

const app = express();
app.use(helmet());
app.use('*', cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(auth);
app.use('/', usersRouter);
app.use('/', routesMovies);

// Обработка неправильного пути '*'
app.use('*', (req, res, next) => {
  next(new NotFound('Обработка неправильного пути'));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
