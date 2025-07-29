import logger from '../utils/logger.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const issues = err.issues || err.errors;

    if (issues) {
      const details = issues.map((e) => {
        const path = e.path.join('.');
        const message =
          e.code === 'invalid_enum_value' || e.code === 'invalid_value'
            ? `${path.charAt(0).toUpperCase() + path.slice(1)} must be one of: ${e.options?.join(', ') || e.values?.join(', ')}`
            : e.message;

        return { path, message };
      });

      logger.error(
        `400 ValidationError in ${req.method} ${req.originalUrl} - ` +
          details.map((e) => `${e.path}: ${e.message}`).join(' | ')
      );

      return res.status(400).json({
        error: 'ValidationError',
        details
      });
    }

    logger.error(
      `500 Unexpected validation error in ${req.method} ${req.originalUrl}: ${err.message}`
    );
    return res.status(500).json({
      error: 'InternalError',
      message: 'Unexpected error during validation'
    });
  }
};
