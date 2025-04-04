const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const {
  addItemToUserCartController, 
  getUserCartItemsController, 
  deleteUserCartController, 
  removeItemFromUserCartController,
  getCartsController,
  getCartController,
  createCartController,
  updateCartController,
  deleteCartController,
  convertCartToOrderController
} = require('../controllers/cart.controller');

const router = express.Router();

// Aplica el middleware de autenticación a las siguientes rutas
router.use(authMiddleware);

// Ruta para agregar un artículo al carrito
router.post('/add', addItemToUserCartController);

// Ruta para btener los artículos del carrito
router.get('/', getUserCartItemsController);

// Ruta para eliminar el carrito completo
router.delete('/', deleteUserCartController);

// Ruta para eliminar un artículo del carrito
router.delete('/remove/:itemId', removeItemFromUserCartController);

// Ruta para convertir el carrito en una orden
router.post('/checkout', convertCartToOrderController);


// Aplica el middleware de administrador a las siguientes rutas
router.use(adminMiddleware);

// Ruta para obtener todos los carritos
router.get('/', getCartsController);

// Ruta para obtener un carrito específico por ID
router.get('/:id', getCartController);

// Ruta para crear un nuevo carrito
router.post('/', createCartController);

// Ruta para actualizar un carrito por ID
router.put('/:id', updateCartController);

// Ruta para eliminar un carrito por ID
router.delete('/:id', deleteCartController);

module.exports = router;