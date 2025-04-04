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

// Aplica el middleware de autenticación a las rutas siguientes
router.use(authMiddleware);

// Ruta para obtener todos los productos
router.get('/', getProductsController);

// Ruta para obtener un producto específico
router.get('/:id', getProductController);

// Ruta para buscar productos
router.get('/search', searchProductsController);

// Aplica el middleware de administrador a las siguientes rutas
router.use(adminMiddleware);

// Ruta para crear un nuevo producto
router.post('/', createProductController);

// Ruta para actualizar un producto por ID
router.put('/:id', updateProductController);

// Ruta para eliminar un producto por ID
router.delete('/:id', deleteProductController);

module.exports = router;