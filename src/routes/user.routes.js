const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUserMeController
} = require('../controllers/user.controller');

const router = express.Router();

// Ruta para obtener información del propio usuario (requiere autenticación)
router.get('/me', authMiddleware, getUserMeController);

// Ruta para crear un nuevo usuario (requiere ser administrador)
router.post('/', adminMiddleware, createUserController);

// Ruta para obtener todos los usuarios (requiere ser administrador)
router.get('/', adminMiddleware, getUsersController);

// Ruta para obtener un usuario específico por ID (requiere ser administrador)
router.get('/:id', adminMiddleware, getUserController);

// Ruta para actualizar un usuario por ID (requiere ser administrador)
router.put('/:id', adminMiddleware, updateUserController);

// Ruta para eliminar un usuario por ID (requiere ser administrador)
router.delete('/:id', adminMiddleware, deleteUserController);

module.exports = router;