// models/user.js
const mongoose = require('mongoose');
const linkRegex = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    director: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    duration: {
      type: Number, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    description: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    year: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    image: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
      validate: {
        validator(v) {
          return linkRegex.test(v);
        },
        message: 'Вставьте ссылку на изображение',
      },
    },
    trailerLink: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
      validate: {
        validator(v) {
          return linkRegex.test(v);
        },
        message: 'Вставьте ссылку на изображение',
      },
    },
    thumbnail: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
      validate: {
        validator(v) {
          return linkRegex.test(v);
        },
        message: 'Вставьте ссылку на изображение',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Обязательное поле'],
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: [true, 'Обязательное поле'],
      ref: 'user',
    },
    nameRU: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
    nameEN: {
      type: String, // имя — это строка
      required: [true, 'Необходимо заполнить поле'],
    },
  },

  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
