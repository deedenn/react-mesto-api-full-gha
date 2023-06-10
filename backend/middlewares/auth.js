const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unautorized');
const { NODE_ENV, JWT_SECRET } = process.env;



const auth = (req, res, next) => {
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
  );
  if (!token) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
