import { IdParamSchema } from '../schemas/common.schema.js';
import logger from '../utils/logger.js';

export const validateId = (req, res, next) => {
  try {
    req.params = IdParamSchema.parse(req.params);
    next();
  } catch (err) {
    const errorDetails =
      err.errors?.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      })) || [];

    logger.error(
      `400 Invalid Id in ${req.method} ${req.originalUrl} - ` +
        errorDetails.map((e) => `${e.path}: ${e.message}`).join(' | ')
    );

    return res.status(400).json({
      error: 'InvalidId',
      message: errorDetails
    });
  }
};
