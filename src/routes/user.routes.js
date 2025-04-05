import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/me', authMiddleware, UserController.getUserMe);

router.post('/', adminMiddleware, UserController.createUser);
router.get('/', adminMiddleware, UserController.getUsers);
router.get('/:id', adminMiddleware, UserController.getUser);
router.put('/:id', adminMiddleware, UserController.updateUser);
router.delete('/:id', adminMiddleware, UserController.deleteUser);

export default router;