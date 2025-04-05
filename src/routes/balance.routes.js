import { Router } from 'express';
import BalanceController from '../controllers/balance.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.get('/me', authMiddleware, BalanceController.getBalanceMe);

router.get('/:usuario_id', adminMiddleware, BalanceController.getBalance);
router.post('/', adminMiddleware, BalanceController.createInitialBalance);
router.put('/:usuario_id', adminMiddleware, BalanceController.updateBalance);
router.delete('/:usuario_id', adminMiddleware, BalanceController.deleteBalance);

export default router;