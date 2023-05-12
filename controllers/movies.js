const Movie = require('../models/movie');
const { STATUS_CODE, MESSAGE } = require('../utils/constantsError');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

// GET /movies - возвращает все сохранённые текущим  пользователем фильмы
const getMovie = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.status(STATUS_CODE.OK).send(movies))
    .catch(next);
};

// POST /movies - создаёт фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => {
      movie
        .populate(['owner'])
        .then(() => res.status(STATUS_CODE.CREATE).send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.ERROR_CREATE_CARD));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/_id -  удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(
      new NotFound(`Фильм с указанным _id=${req.params.movieId} не найден.`),
    )
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        return Movie.findByIdAndDelete(req.params.movieId).then(() => {
          res.status(STATUS_CODE.OK).send({ data: movie });
        });
      }
      throw new ForbiddenError(MESSAGE.ERROR_CONFLICT_CARD);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovie,
};
