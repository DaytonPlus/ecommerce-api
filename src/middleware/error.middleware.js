const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || req.t('internal_server_error'),
  });
};

export default errorHandler;