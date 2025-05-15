import { Router } from 'express';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import userRoutes from './routes/user.routes.js';
import ordersRoutes from './routes/order.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import balanceRoutes from './routes/balance.routes.js';
import cancellation_requestsRoutes from './routes/cancellation_request.routes.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/cart', cartRoutes);
router.use('/api/users', userRoutes);
router.use('/api/orders', ordersRoutes);
router.use('/api/products', productRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/balance', balanceRoutes);
router.use('/api/cancellation_requests', cancellation_requestsRoutes);

export default router;