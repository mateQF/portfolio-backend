import jwt from 'jsonwebtoken';

import logger from '../utils/logger.js';

export const validateAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    logger.error(`401 Invalid token - Unauthorized in ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    logger.error(`401 Invalid token - Unauthorized in ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
  }
};
