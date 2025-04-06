import { Router } from 'express';
import BalanceController from '../controllers/balance.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/balance/me:
 *   get:
 *     summary: Get current user's balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's balance
 *       500:
 *         description: Internal server error
 */
router.get('/me', authMiddleware, BalanceController.getBalanceMe);

/**
 * @swagger
 * /api/balance/{usuario_id}:
 *   get:
 *     summary: Get user's balance by ID (admin only)
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User's balance
 *       404:
 *         description: Balance not found
 *       500:
 *         description: Internal server error
 */
router.get('/:usuario_id', adminMiddleware, BalanceController.getBalance);

/**
 * @swagger
 * /api/balance:
 *   post:
 *     summary: Create initial balance for a user (admin only)
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Balance data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               initialBalance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Initial balance created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/', adminMiddleware, BalanceController.createInitialBalance);

/**
 * @swagger
 * /api/balance/{usuario_id}:
 *   put:
 *     summary: Update user's balance (admin only)
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       description: Balance data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Balance not found
 *       500:
 *         description: Internal server error
 */
router.put('/:usuario_id', adminMiddleware, BalanceController.updateBalance);

/**
 * @swagger
 * /api/balance/{usuario_id}:
 *   delete:
 *     summary: Delete user's balance (admin only)
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Balance deleted successfully
 *       404:
 *         description: Balance not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:usuario_id', adminMiddleware, BalanceController.deleteBalance);

export default router;