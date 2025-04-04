const express = require('express');
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

// Aplica el middleware authMiddleware a las rutas siguientes
router.use(authMiddleware);

// Ruta para obtener informacion del propio usuario
router.get('/me', getUserMeController);

// Aplica el middleware adminMiddleware a las rutas siguientes
router.use(adminMiddleware);

// Ruta para crear un nuevo usuario
router.post('/', createUserController);

// Ruta para obtener todos los usuarios
router.get('/', getUsersController);

// Ruta para obtener un usuario específico por ID
router.get('/:id', getUsersController);

// Ruta para actualizar un usuario por ID
router.put('/:id', updateUserController);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUserController);

module.exports = router;