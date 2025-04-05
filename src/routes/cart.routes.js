import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import CartController from '../controllers/cart.controller.js';

const router = Router();

router.post('/add', authMiddleware, CartController.addItemToUserCart);
router.get('/user', authMiddleware, CartController.getUserCartItems);
router.delete('/user', authMiddleware, CartController.deleteUserCart);
router.delete('/user/remove/:itemId', authMiddleware, CartController.removeItemFromUserCart);
router.post('/user/checkout', authMiddleware, CartController.convertCartToOrder);

router.get('/', adminMiddleware, CartController.getCarts);
router.get('/:id', adminMiddleware, CartController.getCart);
router.post('/', adminMiddleware, CartController.createCart);
router.put('/:id', adminMiddleware, CartController.updateCart);
router.delete('/:id', adminMiddleware, CartController.deleteCart);

export default router;