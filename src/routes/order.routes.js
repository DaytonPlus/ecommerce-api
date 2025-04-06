import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import OrderController from '../controllers/order.controller.js';

const router = Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/me', authMiddleware, OrderController.getUserOrders);
router.post('/cancel/:id', authMiddleware, OrderController.requestCancelOrder);

router.get('/', adminMiddleware, OrderController.getOrders);
router.get('/:id', adminMiddleware, OrderController.getOrder);
router.put('/:id', adminMiddleware, OrderController.updateOrder);
router.delete('/:id', adminMiddleware, OrderController.deleteOrder);

export default router;