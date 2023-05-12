const routesMovies = require('express').Router();
const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validation');

routesMovies.get('/movies', getMovie); // возвращает все сохранённые текущим  пользователем фильмы
routesMovies.post('/movies', validateMovie, createMovie); // создаёт фильм
routesMovies.delete('/movies/:movieId', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = routesMovies;
