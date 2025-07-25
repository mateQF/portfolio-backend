import { Router } from 'express';

import { ProjectController } from '../controllers/project.controller.js';
import { validate } from '../middlewares/validateSchema.js';
import { ProjectSchema } from '../schemas/project.schema.js';
import { validateId } from '../middlewares/validateId.js';
import {
  generalLimiter,
  createProjectLimiter,
  singleProjectLimiter
} from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', generalLimiter, ProjectController.getAll);
router.get('/:id', validateId, singleProjectLimiter, ProjectController.getById);
router.post('/', createProjectLimiter, validate(ProjectSchema), ProjectController.create);
router.put('/:id', validateId, validate(ProjectSchema), ProjectController.update);
router.delete('/:id', validateId, ProjectController.remove);

export default router;
