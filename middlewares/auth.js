const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
