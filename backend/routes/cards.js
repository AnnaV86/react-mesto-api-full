const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validationUrl } = require('../utils/validationUrl');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Поиск всех карточек GET
router.get('/cards', getCards);
// Создание карточки POST
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validationUrl),
      user: Joi.any(),
    }),
  }),
  createCard,
);
// Удалить карточку по ID DELETE
router.delete(
  '/cards/:cardID',
  celebrate({
    params: Joi.object().keys({
      cardID: Joi.string().length(24).hex(),
    }),
  }),
  deleteCard,
);
// Поставить лайк карточке PUT
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  likeCard,
);
// Убрать лайк DELETE
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
