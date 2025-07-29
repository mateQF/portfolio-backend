import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { generalLimiter } from './rateLimiter.js';

const corsOptions = {
  origin: '*', // front
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export function applySecurityMiddleware(app) {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(hpp());
  app.use(cookieParser());
  app.use(generalLimiter); // 👈 Aplica a todas las rutas
}
