const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { 
  createCancellationRequestController, 
  getAllCancellationRequestsController, 
  getCancellationRequestByIdController, 
  updateCancellationRequestStatusController,
  getAllCancellationRequestsMeController
} = require('../controllers/cancellation_request.controller');

const router = express.Router();

// Aplica el middleware de autenticación a las rutas siguientes
router.use(authMiddleware);

// Ruta para crear una solicitud de cancelación
router.post('/orders/:orderId', createCancellationRequestController);

// Ruta para obtener las solicitudes de cancelación del usuario autenticado
router.get('/me', getAllCancellationRequestsMeController);

// Aplica el middleware de administrador a las rutas siguientes
router.use(adminMiddleware);

// Ruta para obtener todas las solicitudes de cancelación
router.get('/', getAllCancellationRequestsController);

// Ruta para obtener una solicitud de cancelación por ID
router.get('/:id', getCancellationRequestByIdController);

// Ruta para actualizar el estado de una solicitud de cancelación
router.put('/:id', updateCancellationRequestStatusController);

module.exports = router;
