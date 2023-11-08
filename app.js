require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { limiter } = require('./utils/constants');

const { PORT = 4111, bitfilmsdb = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const app = express();

const allowedOrigins = ['https://diplomasavegod.nomoredomainsrocks.ru'];

const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(bitfilmsdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
