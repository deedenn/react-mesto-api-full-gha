const centralError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Ошибка в работе сервера' : message,
  });
  next();
};

module.exports = { centralError };
