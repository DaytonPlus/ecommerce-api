const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductsController
} = require('../controllers/product.controller');

const router = express.Router();

// Ruta para obtener todos los productos (accesible para todos)
router.get('/', getProductsController);

// Ruta para obtener un producto específico (accesible para todos)
router.get('/:id', getProductController);

// Ruta para buscar productos (accesible para todos)
router.get('/search', searchProductsController);

// Ruta para crear un nuevo producto (requiere ser administrador)
router.post('/', adminMiddleware, createProductController);

// Ruta para actualizar un producto por ID (requiere ser administrador)
router.put('/:id', adminMiddleware, updateProductController);

// Ruta para eliminar un producto por ID (requiere ser administrador)
router.delete('/:id', adminMiddleware, deleteProductController);

module.exports = router;