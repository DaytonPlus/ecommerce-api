const { pool } = require('../config/database');
const { createOrderInDB, insertOrderDetail } = require('./order.controller');
const { getBalanceByUserId } = require('./balance.controller.js');

// Función para verificar si un artículo ya existe en el carrito
const checkItemInCart = async (userId, productId) => {
  const { rows } = await pool.query(
    'SELECT * FROM carts WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );
  return rows.length > 0;
};

// Función para agregar un artículo al carrito
const addItemToCartDB = async (userId, productId, quantity) => {
  const existingItem = await checkItemInCart(userId, productId);

  if (existingItem) {
    await pool.query(
      'UPDATE carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
      [quantity, userId, productId]
    );
  } else {
    await pool.query(
      'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
  }
};

// Función para obtener los artículos del carrito
const getCartItemsDB = async (userId) => {
  const { rows } = await pool.query(
    'SELECT * FROM carts WHERE user_id = $1',
    [userId]
  );
  return rows;
};

// Función para eliminar un artículo del carrito
const removeItemFromCartDB = async (userId, itemId) => {
  await pool.query(
    'DELETE FROM carts WHERE user_id = $1 AND product_id = $2',
    [userId, itemId]
  );
};

// Función para eliminar todo el carrito
const deleteCartDB = async (userId) => {
  await pool.query('DELETE FROM carts WHERE user_id = $1', [userId]);
};

// Función para obtener todos los carritos
const getAllCarts = async () => {
  const { rows } = await pool.query('SELECT * FROM carts');
  return rows;
};

// Función para obtener un carrito específico por ID
const getCartById = async (cartId) => {
  const { rows } = await pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
  return rows[0] || null;
};

// Función para crear un nuevo carrito
const createCartDB = async (userId, productId, quantity) => {
  await pool.query(
    'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)',
    [userId, productId, quantity]
  );
};

// Función para actualizar un carrito
const updateCartDB = async (cartId, userId, productId, quantity) => {
  await pool.query(
    'UPDATE carrito SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4',
    [userId, productId, quantity, cartId]
  );
};

// Función para eliminar un carrito
const deleteCartById = async (cartId) => {
  await pool.query('DELETE FROM carts WHERE id = $1', [cartId]);
};

// Función Para calcular el precio total de todos los items en el carrito del usuario
const calculateCartPriceTotal = async (userId) => {
  const items = await getCartItemsDB(userId);

  if (!items || items.length === 0) {
    return 0.0;
  }

  let total = 0.0;

  for (let item of items) {
      // Asegura que el precio sea numérico
    const price = parseFloat(item.price);
      
    // Asegura que la cantidad sea un entero
    const quantity = parseInt(item.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      return null;
    }

    // Calcula el subtotal por producto
    total += price * quantity;
  }
  
  return total.toFixed(2);
};

// Controlador para agregar un artículo al carrito
const addItemToUserCartController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    await addItemToCartDB(userId, productId, quantity);
    res.status(200).json({ message: req.t('item_added_to_cart') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_adding_item_to_cart') });
  }
};

// Controlador para obtener los artículos del carrito
const getUserCartItemsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const items = await getCartItemsDB(userId);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_cart_items') });
  }
};

// Controlador para eliminar un artículo del carrito
const removeItemFromUserCartController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    await removeItemFromCartDB(userId, productId);
    res.status(200).json({ message: req.t('item_removed_from_cart') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_removing_item_from_cart') });
  }
};

// Controlador para eliminar todo el carrito
const deleteUserCartController = async (req, res) => {
  try {
    const userId = req.user.userId;

    await deleteCartDB(userId);
    res.status(200).json({ message: req.t('cart_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_cart') });
  }
};

// Controlador para obtener todos los carritos
const getCartsController = async (req, res) => {
  try {
    const carts = await getAllCarts();
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_carts') });
  }
};

// Controlador para obtener un carrito específico
const getCartController = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ message: req.t('cart_not_found') });
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_cart') });
  }
};

// Controlador para crear un nuevo carrito
const createCartController = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    await createCartDB(userId, productId, quantity);
    res.status(201).json({ message: req.t('cart_created_successfully') });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: req.t('error_creating_cart') });
  }
};

// Controlador para actualizar un carrito
const updateCartController = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { userId, productId, quantity } = req.body;
    await updateCartDB(cartId, userId, productId, quantity);
    res.status(200).json({ message: req.t('cart_updated_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_cart') });
  }
};

// Controlador para eliminar un carrito
const deleteCartController = async (req, res) => {
  try {
    const cartId = req.params.id;
    await deleteCartById(cartId);
    res.status(200).json({ message: req.t('cart_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_cart') });
  }
};

// Controlador para convertir el carrito en una orden
const convertCartToOrderController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shipping_address } = req.body;

    const cartItems = await getCartItemsDB(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: req.t('cart_is_empty') });
    }

    
    const total = await calculateCartPriceTotal(userId);
    const balance = await getBalanceByUserId(userId);
    const newBalance = balance - total;
    
    if(newBalance < 0.0) {
      return res.status(400).json({ message: req.t('insufficient_balance', { balance, newBalance }) });
    }
    
    await updateBalance(userId, newBalance);
    
    const newOrder = await createOrderInDB({
      user_id: userId,
      total,
      status: 'pending',
      shipping_address,
      shipping_status: 'pending'
    });

    // Insertar detalles de la orden
    for (const item of cartItems) {
      await insertOrderDetail(newOrder.id, item.product_id, item.quantity);
    }

    // Eliminar el carrito después de crear la orden
    await deleteCartDB(userId);

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_converting_cart_to_order') });
  }
};


module.exports = {
  // Funciones
  checkItemInCart,
  addItemToCartDB,
  getCartItemsDB,
  removeItemFromCartDB,
  deleteCartDB,
  getAllCarts,
  getCartById,
  createCartDB,
  updateCartDB,
  deleteCartById,
  calculateCartPriceTotal,

  // Controladores
  addItemToUserCartController,
  getUserCartItemsController,
  removeItemFromUserCartController,
  deleteUserCartController,
  getCartsController,
  getCartController,
  createCartController,
  updateCartController,
  deleteCartController,
  convertCartToOrderController
};