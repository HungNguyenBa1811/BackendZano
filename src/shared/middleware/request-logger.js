const { logger } = require('../logger/logger');

function requestLogger(req, _res, next) {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
  });
  next();
}

module.exports = { requestLogger };
