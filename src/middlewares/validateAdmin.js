import logger from '../utils/logger.js';

export const validateAdmin = (req, res, next) => {
  logger.error(`403 Forbidden - Access denied - in ${req.method} ${req.originalUrl}`);
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden', message: 'Access denied' });
  }
  next();
};
