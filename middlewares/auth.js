const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../errors/error-config');

const errorMessage = errorMessages.forbiddenErrorMessage;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError(errorMessage);
  }
  const token = authorization.replace('Bearer ', '');
  res.send({ token });

  let payload;
  try {
    payload = jwt.verify(token, process.env.NOVE_ENV ? process.env.JWT_SECRET : 'jwt-secret');
  } catch (err) {
    throw new ForbiddenError(errorMessage);
  }

  req.user = payload;

  return next();
};
