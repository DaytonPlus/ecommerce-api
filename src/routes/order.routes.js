const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { 
  createOrderController, 
  getUserOrdersController, 
  getOrdersController, 
  getOrderController, 
  updateOrderController, 
  deleteOrderController, 
  requestCancelOrderController
} = require('../controllers/order.controller');

const router = express.Router();

// Ruta para crear una nueva orden (requiere autenticación)
router.post('/', authMiddleware, createOrderController);

// Ruta para obtener las órdenes del usuario autenticado
router.get('/me', authMiddleware, getUserOrdersController);

// Ruta para solicitar cancelar una orden (requiere autenticación)
router.post('/cancel/:id', authMiddleware, requestCancelOrderController);

// Ruta para obtener todas las órdenes (requiere ser administrador)
router.get('/', adminMiddleware, getOrdersController);

// Ruta para obtener una orden específica por ID (requiere ser administrador)
router.get('/:id', adminMiddleware, getOrderController);

// Ruta para actualizar una orden por ID (requiere ser administrador)
router.put('/:id', adminMiddleware, updateOrderController);

// Ruta para eliminar una orden por ID (requiere ser administrador)
router.delete('/:id', adminMiddleware, deleteOrderController);

module.exports = router;