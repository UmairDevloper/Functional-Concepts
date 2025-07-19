const errorHandler = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : err.statusCode;
  res.status(status);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
