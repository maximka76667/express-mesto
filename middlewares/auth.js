const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../errors/error-config');
const UnauthorizedError = require('../errors/unauthorized-error');

const { forbiddenErrorMessage } = errorMessages;
const { unauthorizedErrorMessage } = errorMessages;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError(forbiddenErrorMessage);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'd0bba31110b6f667ad75b3e7715e5c9a94c6f561108a7f1293520171d3f69e3d');
  } catch (err) {
    throw new UnauthorizedError(unauthorizedErrorMessage);
  }

  req.user = payload;

  return next();
};
