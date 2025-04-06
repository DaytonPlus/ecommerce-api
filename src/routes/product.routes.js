import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.get('/search', ProductController.searchProducts);

router.post('/', adminMiddleware, ProductController.createProduct);
router.put('/:id', adminMiddleware, ProductController.updateProduct);
router.delete('/:id', adminMiddleware, ProductController.deleteProduct);

export default router;