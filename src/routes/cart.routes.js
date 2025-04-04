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

// Ruta para agregar un artículo al carrito (requiere autenticación)
router.post('/add', authMiddleware, addItemToUserCartController);

// Ruta para obtener los artículos del carrito (requiere autenticación)
router.get('/user', authMiddleware, getUserCartItemsController);

// Ruta para eliminar el carrito completo (requiere autenticación)
router.delete('/user', authMiddleware, deleteUserCartController);

// Ruta para eliminar un artículo del carrito (requiere autenticación)
router.delete('/user/remove/:itemId', authMiddleware, removeItemFromUserCartController);

// Ruta para convertir el carrito en una orden (requiere autenticación)
router.post('/user/checkout', authMiddleware, convertCartToOrderController);

// Ruta para obtener todos los carritos (requiere ser administrador)
router.get('/', adminMiddleware, getCartsController);

// Ruta para obtener un carrito específico por ID (requiere ser administrador)
router.get('/:id', adminMiddleware, getCartController);

// Ruta para crear un nuevo carrito (requiere ser administrador)
router.post('/', adminMiddleware, createCartController);

// Ruta para actualizar un carrito por ID (requiere ser administrador)
router.put('/:id', adminMiddleware, updateCartController);

// Ruta para eliminar un carrito por ID (requiere ser administrador)
router.delete('/:id', adminMiddleware, deleteCartController);

module.exports = router;