import { Router } from 'express';
import { changeLanguageController } from '../controllers/lang.controller.js';

const router = Router();

/**
 * @swagger
 * /api/lang:
 *   get:
 *     summary: Change the language
 *     tags: [Language]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: true
 *         description: Language code
 *     responses:
 *       200:
 *         description: Language changed successfully
 *       400:
 *         description: Language parameter is required
 *       500:
 *         description: Internal server error
 */
router.get('/lang', changeLanguageController);

export default router;