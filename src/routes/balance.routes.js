const express = require('express');
const {
  getBalanceMeController,
  getBalanceController,
  updateBalanceController,
  createInitialBalanceController,
  deleteBalanceController
} = require('../controllers/balance.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');

const router = express.Router();

// Ruta para obtener el saldo del usuario autenticado
router.get('/me', authMiddleware, getBalanceMeController);

// Ruta para obtener el saldo por usuario ID (requiere ser administrador)
router.get('/:usuario_id', adminMiddleware, getBalanceController);

// Ruta para crear un nuevo registro de saldo (requiere ser administrador)
router.post('/', adminMiddleware, createInitialBalanceController);

// Ruta para actualizar el saldo por usuario ID (requiere ser administrador)
router.put('/:usuario_id', adminMiddleware, updateBalanceController);

// Ruta para eliminar un registro de saldo por usuario ID (requiere ser administrador)
router.delete('/:usuario_id', adminMiddleware, deleteBalanceController);

module.exports = router;