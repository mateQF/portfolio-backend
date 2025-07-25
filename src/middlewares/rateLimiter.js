import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'TooManyRequests',
    message: 'Has superado el límite de peticiones. Intenta más tarde.'
  }
});

export const createProjectLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10,
  message: {
    error: 'TooManyRequests',
    message: 'Solo se permiten 10 creaciones de proyectos por hora.'
  }
});

export const singleProjectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15,
  message: {
    error: 'TooManyRequests',
    message: 'Demasiadas solicitudes a este proyecto. Espera un momento.'
  }
});
