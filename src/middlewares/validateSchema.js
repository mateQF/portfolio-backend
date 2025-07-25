import logger from '../utils/logger.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    logger.error(
      `400 ValidationError - ${err.errors?.map((e) => e.message).join(', ')} in ${req.method} ${req.originalUrl}`
    );
    return res.status(400).json({
      error: 'ValidationError',
      message: err.errors?.map((e) => e.message).join(', ')
    });
  }
};
