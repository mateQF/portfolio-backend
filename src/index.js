import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

import projectRouter from './routes/project.routes.js';
import authRouter from './routes/auth.routes.js';
import techRouter from './routes/techstack.routes.js';
import healthRouter from './routes/health.routes.js';
import contactRouter from './routes/contact.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerSpec } from './config/swagger.js';
import { applySecurityMiddleware } from './middlewares/security.js';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
applySecurityMiddleware(app);
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tech', techRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/contact', contactRouter);

app.get('/', (_req, res) => res.send('<h1>0K!</h1>'));
app.get('/test', (_req, res) => res.send('ok'));

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
);

export default app;
