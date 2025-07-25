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
import { validateAuth } from '../middlewares/validateAuth.js';
import { validateAdmin } from '../middlewares/validateAdmin.js';

const router = Router();

router.get('/', generalLimiter, ProjectController.getAll);
router.get('/:id', validateId, singleProjectLimiter, ProjectController.getById);
router.post(
  '/',
  validateAuth,
  validateAdmin,
  createProjectLimiter,
  validate(ProjectSchema),
  ProjectController.create
);
router.put(
  '/:id',
  validateAuth,
  validateAdmin,
  validateId,
  validate(ProjectSchema),
  ProjectController.update
);
router.delete('/:id', validateAuth, validateAdmin, validateId, ProjectController.remove);

export default router;
