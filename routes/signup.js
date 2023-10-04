const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  }),
  createUser,
);

module.exports = router;
