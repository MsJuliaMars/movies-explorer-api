require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { corsOptions } = require('./utils/corsOptions');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');
const limiter = require('./utils/rateLimit');

const { MONGO_DB } = require('./utils/const');

// Слушаем 3000 порт
const { PORT = 3001 } = process.env;
// mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {});

const app = express();
app.use(helmet());
app.use('*', cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);
app.use(limiter);

app.use(routes);

// Обработка неправильного пути '*'
app.use('*', (req, res, next) => {
  next(new NotFound('Обработка неправильного пути'));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);
app.listen(PORT);
