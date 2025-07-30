import { ContactSchema } from '../schemas/contact.schema.js';
import logger from '../utils/logger.js';

export const validateContact = (req, res, next) => {
  try {
    req.body = ContactSchema.parse(req.body);
    next();
  } catch (err) {
    const errorDetails =
      err.errors?.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      })) || [];

    logger.error(
      `400 ValidationError ${req.method} ${req.originalUrl} - ` +
        errorDetails.map((e) => `${e.path}: ${e.message}`).join(' | ')
    );

    return res.status(400).json({
      error: 'ValidationError',
      message: errorDetails
    });
  }
};
