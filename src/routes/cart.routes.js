import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import CartController from '../controllers/cart.controller.js';

const router = Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Item data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware, CartController.addItemToUserCart);

/**
 * @swagger
 * /api/cart/user:
 *   get:
 *     summary: Get user's cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Internal server error
 */
router.get('/user', authMiddleware, CartController.getUserCartItems);

/**
 * @swagger
 * /api/cart/user:
 *   delete:
 *     summary: Delete the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/user', authMiddleware, CartController.deleteUserCart);

/**
 * @swagger
 * /api/cart/user/remove/{itemId}:
 *   delete:
 *     summary: Remove an item from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item to remove
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       500:
 *         description: Internal server error
 */
router.delete('/user/remove/:itemId', authMiddleware, CartController.removeItemFromUserCart);

/**
 * @swagger
 * /api/cart/user/checkout:
 *   post:
 *     summary: Convert the user's cart to an order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart converted to order
 *       500:
 *         description: Internal server error
 */
router.post('/user/checkout', authMiddleware, CartController.convertCartToOrder);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all carts (admin only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all carts
 *       500:
 *         description: Internal server error
 */
router.get('/', adminMiddleware, CartController.getCarts);

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Get a cart by ID (admin only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart
 *     responses:
 *       200:
 *         description: Cart details
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', adminMiddleware, CartController.getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart (admin only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Cart data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/', adminMiddleware, CartController.createCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update a cart (admin only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart
 *     requestBody:
 *       description: Cart data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', adminMiddleware, CartController.updateCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete a cart (admin only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', adminMiddleware, CartController.deleteCart);

export default router;