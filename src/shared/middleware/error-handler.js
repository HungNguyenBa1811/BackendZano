const { logger } = require('../logger/logger');

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const traceId = _req.traceId || null;
  const code = error.code || 'INTERNAL_SERVER_ERROR';

  logger.error(error.message, {
    traceId,
    stack: error.stack,
    details: error.details || null,
  });

  res.status(statusCode).json({
    error: {
      code,
      message: error.message || 'Internal server error',
      details: error.details || null,
    },
    meta: {
      traceId,
    },
  });
}

module.exports = { errorHandler };
