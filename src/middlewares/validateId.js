import { IdParamSchema } from '../schemas/common.schema.js';
import logger from '../utils/logger.js';

export const validateId = (req, res, next) => {
  try {
    req.params = IdParamSchema.parse(req.params);
    next();
  } catch (err) {
    logger.error(
      `400 InvalidId - ${err.errors?.[0]?.message || 'Invalid ID'} in ${req.method} ${req.originalUrl}`
    );
    return res.status(400).json({
      error: 'InvalidId',
      message: err.errors?.[0]?.message || 'Invalid ID'
    });
  }
};
