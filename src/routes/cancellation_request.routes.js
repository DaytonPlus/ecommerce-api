import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import CancellationRequestController from '../controllers/cancellation_request.controller.js';

const router = Router();

router.post('/orders/:orderId', authMiddleware, CancellationRequestController.createCancellationRequest);
router.get('/me', authMiddleware, CancellationRequestController.getAllCancellationRequestsMe);

router.get('/', adminMiddleware, CancellationRequestController.getAllCancellationRequests);
router.get('/:id', adminMiddleware, CancellationRequestController.getCancellationRequestById);
router.put('/:id', adminMiddleware, CancellationRequestController.updateCancellationRequestStatus);

export default router;