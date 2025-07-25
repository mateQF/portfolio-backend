import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(`${req.method} ${req.url} - ${err.name}: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
  next();
}
