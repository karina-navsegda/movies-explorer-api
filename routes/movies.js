const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegex),
    trailerLink: Joi.string().required().pattern(linkRegex),
    thumbmail: Joi.string().required().pattern(linkRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.get('/', getMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
