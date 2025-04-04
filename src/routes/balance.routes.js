const express = require('express');
const {
  getBalanceMeController,
  getBalanceController,
  updateBalanceController,
  createInitialBalanceController,
  deleteBalanceController
} = require('../controllers/saldo.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');

const router = express.Router();

// Aplica el middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Ruta para obtener el saldo por usuario ID
router.get('/me', getBalanceMeController);

// Aplica el middleware de administrador a las rutas siguientes
router.use(adminMiddleware);

// Ruta para obtener el saldo por usuario ID
router.get('/:usuario_id', getBalanceController);

// Ruta para crear un nuevo registro de saldo
router.post('/', createInitialBalanceController);

// Ruta para actualizar el saldo por usuario ID
router.put('/:usuario_id', updateBalanceController);

// Ruta para eliminar un registro de saldo por usuario ID
router.delete('/:usuario_id', deleteBalanceController);

module.exports = router;