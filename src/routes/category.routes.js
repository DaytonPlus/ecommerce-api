import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import CategoryController from '../controllers/category.controller.js';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategory);

router.post('/', adminMiddleware, CategoryController.createCategory);
router.put('/:id', adminMiddleware, CategoryController.updateCategory);
router.delete('/:id', adminMiddleware, CategoryController.deleteCategory);

export default router;