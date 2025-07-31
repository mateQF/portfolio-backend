import logger from '../utils/logger.js';
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  logger.error(`${req.method} ${req.url} - ${err.name}: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
}
