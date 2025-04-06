import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import CancellationRequestController from '../controllers/cancellation_request.controller.js';

const router = Router();

/**
 * @swagger
 * /api/cancellation_requests/orders/{orderId}:
 *   post:
 *     summary: Create a cancellation request for an order
 *     tags: [Cancellation Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     requestBody:
 *       description: Cancellation reason
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cancellation request created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/orders/:orderId', authMiddleware, CancellationRequestController.createCancellationRequest);

/**
 * @swagger
 * /api/cancellation_requests/me:
 *   get:
 *     summary: Get all cancellation requests for the current user
 *     tags: [Cancellation Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cancellation requests for the current user
 *       500:
 *         description: Internal server error
 */
router.get('/me', authMiddleware, CancellationRequestController.getAllCancellationRequestsMe);

/**
 * @swagger
 * /api/cancellation_requests:
 *   get:
 *     summary: Get all cancellation requests (admin only)
 *     tags: [Cancellation Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all cancellation requests
 *       500:
 *         description: Internal server error
 */
router.get('/', adminMiddleware, CancellationRequestController.getAllCancellationRequests);

/**
 * @swagger
 * /api/cancellation_requests/{id}:
 *   get:
 *     summary: Get a cancellation request by ID (admin only)
 *     tags: [Cancellation Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cancellation request
 *     responses:
 *       200:
 *         description: Cancellation request details
 *       404:
 *         description: Cancellation request not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', adminMiddleware, CancellationRequestController.getCancellationRequestById);

/**
 * @swagger
 * /api/cancellation_requests/{id}:
 *   put:
 *     summary: Update the status of a cancellation request (admin only)
 *     tags: [Cancellation Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cancellation request
 *     requestBody:
 *       description: New status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cancellation request status updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Cancellation request not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', adminMiddleware, CancellationRequestController.updateCancellationRequestStatus);

export default router;