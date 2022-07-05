const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationUrl } = require('../utils/validationUrl');
const {
  getUsers,
  getProfile,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

// Получение информации о пользователе GET users/me
router.get('/users/me', getProfile);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserId,
);
// Редактирование данных пользователя PATCH
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserInfo,
);
// Редактирование аватара пользователя PATCH
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validationUrl),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
