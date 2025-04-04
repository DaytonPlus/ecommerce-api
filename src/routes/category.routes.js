const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { 
  getCategoriesController, 
  getCategoryController, 
  createCategoryController, 
  updateCategoryController, 
  deleteCategoryController
} = require('../controllers/category.controller');

const router = Router();
// Ruta para obtener todas las categorías (accesible para todos)
router.get('/', getCategoriesController);

// Ruta para obtener una categoría específica por ID (accesible para todos)
router.get('/:id', getCategoryController);

// Ruta para crear una nueva categoría (requiere ser administrador)
router.post('/', adminMiddleware, createCategoryController);

// Ruta para actualizar una categoría por ID (requiere ser administrador)
router.put('/:id', adminMiddleware, updateCategoryController);

// Ruta para eliminar una categoría por ID (requiere ser administrador)
router.delete('/:id', adminMiddleware, deleteCategoryController);

module.exports = router;