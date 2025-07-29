import { Router } from 'express';

import { TechStackController } from '../controllers/techstack.controller.js';
import { validate } from '../middlewares/validateSchema.js';
import { validateId } from '../middlewares/validateId.js';
import { TechStackSchema } from '../schemas/techstack.schema.js';
import { validateAuth } from '../middlewares/validateAuth.js';
import { validateAdmin } from '../middlewares/validateAdmin.js';

const router = Router();

router.get('/', TechStackController.getAll);
router.get('/:id', validateId, TechStackController.getById);
router.post(
  '/',
  validateAuth,
  validateAdmin,
  validate(TechStackSchema),
  TechStackController.create
);
router.put(
  '/:id',
  validateAuth,
  validateAdmin,
  validateId,
  validate(TechStackSchema),
  TechStackController.update
);
router.delete('/:id', validateAuth, validateAdmin, validateId, TechStackController.remove);

export default router;
