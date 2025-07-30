import { Router } from 'express';

import { ContactController } from '../controllers/contact.controller.js';
import { validateContact } from '../middlewares/validateContact.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, validateContact, ContactController.sendMessage);

export default router;
