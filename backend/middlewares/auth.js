const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError({ message: 'Ошибка авторизации' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError({ message: 'Ошибка авторизации' });
  }

  req.user = payload;

  next();
};

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     throw new UnauthorizedError('Ошибка авторизации');
//   }
//   let payload;
//   try {
//     payload = jwt.verify(token.jwt, NODE_ENV ? JWT_SECRET : 'dev-secret');
//   } catch (error) {
//     next(new UnauthorizedError('Ошибка авторизации'));
//   }
//   req.user = payload;
//   next();
// };
