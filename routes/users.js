const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { emailRegex } = require('../utils/constants');

const {
  editUser,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required()
      .pattern(emailRegex),
  }),
}), editUser);

module.exports = router;
