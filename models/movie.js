const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return /^(http:|https:)\/\/w*\w/.test(image);
      },
      message: 'Переданы некорректные данные в поле /image/',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailerLink) {
        return /^(http:|https:)\/\/w*\w/.test(trailerLink);
      },
      message: 'Переданы некорректные данные в поле /trailerLink/',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnail) {
        return /^(http:|https:)\/\/w*\w/.test(thumbnail);
      },
      message: 'Переданы некорректные данные в поле /thumbnail/',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
