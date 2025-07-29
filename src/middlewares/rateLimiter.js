import rateLimit from 'express-rate-limit';

import logger from '../utils/logger.js';

const rateLimitHandler = (req, res, _next, options) => {
  const message = options.message?.message || 'Too many requests';
  logger.warn(
    `429 TooManyRequests - ${req.method} ${req.originalUrl} - IP: ${req.ip} - Reason: ${message}`
  );
  res.status(options.statusCode || 429).json(options.message);
};

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 25,
  standardHeaders: true,
  handler: rateLimitHandler,
  legacyHeaders: false,
  message: {
    error: 'TooManyRequests',
    message: 'Too many requests. Please try again later.'
  }
});

export const createProjectLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10,
  handler: rateLimitHandler,
  message: {
    error: 'TooManyRequests',
    message: 'Only 10 project creations allowed per hour.'
  }
});

export const singleProjectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15,
  handler: rateLimitHandler,
  message: {
    error: 'TooManyRequests',
    message: 'Too many requests to this project. Please wait a moment.'
  }
});
