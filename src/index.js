import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

import projectRouter from './routes/project.routes.js';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerSpec } from './config/swagger.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.send('<h1>OK!</h1>');
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;
