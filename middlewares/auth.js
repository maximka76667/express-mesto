const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, process.env.NOVE_ENV ? process.env.JWT_SECRET : 'jwt-secret');
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};
