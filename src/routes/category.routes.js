const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { 
  getCategoriesController, 
  getCategoryController, 
  createCategoryController, 
  updateCategoryController, 
  deleteCategoryController
} = require('../controllers/category.controller');

const router = express.Router();

// Aplica el middleware de autenticación a las rutas siguientes
router.use(authMiddleware);

// Ruta para obtener todas las categorías
router.get('/', getCategoriesController);

// Ruta para obtener una categoría específica por ID
router.get('/:id', getCategoryController);

// Aplica el middleware de administrador a las rutas siguientes
router.use(adminMiddleware);

// Ruta para crear una nueva categoría
router.post('/', createCategoryController);

// Ruta para actualizar una categoría por ID
router.put('/:id', updateCategoryController);

// Ruta para eliminar una categoría por ID
router.delete('/:id', deleteCategoryController);

module.exports = router;