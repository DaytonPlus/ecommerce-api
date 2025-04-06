import { Router } from 'express';
import { changeLanguageController } from '../controllers/lang.controller.js';

const router = Router();

router.get('/lang', changeLanguageController);

export default router;