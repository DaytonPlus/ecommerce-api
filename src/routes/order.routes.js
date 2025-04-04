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

// Aplica el middleware de autenticación a las rutas siguientes
router.use(authMiddleware);

// Ruta para crear una nueva orden
router.post('/', createOrderController);

// Ruta para obtener las órdenes del usuario autenticado
router.get('/me', getUserOrdersController);

// Ruta para solicitar cancelar una orden
router.post('/cancel/:id', requestCancelOrderController);

// Aplica el middleware de administrador a las rutas siguientes
router.use(adminMiddleware);

// Ruta para btener todas las órdenes
router.get('/', getOrdersController);

// Ruta para btener una orden específica por ID
router.get('/:id', getOrderController);

// Ruta para ctualizar una orden por ID
router.put('/:id', updateOrderController);

// Ruta para eliminar una orden por ID
router.delete('/:id', deleteOrderController);

module.exports = router;