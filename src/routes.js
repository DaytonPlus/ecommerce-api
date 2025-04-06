import { Router } from 'express';
// import langRoutes from './routes/lang.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import userRoutes from './routes/user.routes.js';
import ordersRoutes from './routes/order.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import balanceRoutes from './routes/balance.routes.js';
import cancellation_requestsRoutes from './routes/cancellation_request.routes.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User cart management
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Product category management
 */

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: User balance management
 */

/**
 * @swagger
 * tags:
 *   name: Cancellation Requests
 *   description: Order cancellation requests management
 */


/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: User authentication endpoints
 *     tags: [Authentication]
 */
router.use('/api/auth', authRoutes);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: User cart endpoints
 *     tags: [Cart]
 */
router.use('/api/cart', cartRoutes);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: User management endpoints
 *     tags: [Users]
 */
router.use('/api/users', userRoutes);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Order management endpoints
 *     tags: [Orders]
 */
router.use('/api/orders', ordersRoutes);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Product management endpoints
 *     tags: [Products]
 */
router.use('/api/products', productRoutes);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Product category management endpoints
 *     tags: [Categories]
 */
router.use('/api/categories', categoryRoutes);

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: User balance management endpoints
 *     tags: [Balance]
 */
router.use('/api/balance', balanceRoutes);

/**
 * @swagger
 * /api/cancellation_requests:
 *   get:
 *     summary: Order cancellation requests management endpoints
 *     tags: [Cancellation Requests]
 */
router.use('/api/cancellation_requests', cancellation_requestsRoutes);

export default router;