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

// Ruta para crear una solicitud de cancelación (requiere autenticación)
router.post('/orders/:orderId', authMiddleware, createCancellationRequestController);

// Ruta para obtener las solicitudes de cancelación del usuario autenticado
router.get('/me', authMiddleware, getAllCancellationRequestsMeController);

// Ruta para obtener todas las solicitudes de cancelación (requiere ser administrador)
router.get('/', adminMiddleware, getAllCancellationRequestsController);

// Ruta para obtener una solicitud de cancelación por ID (requiere ser administrador)
router.get('/:id', adminMiddleware, getCancellationRequestByIdController);

// Ruta para actualizar el estado de una solicitud de cancelación (requiere ser administrador)
router.put('/:id', adminMiddleware, updateCancellationRequestStatusController);

module.exports = router;