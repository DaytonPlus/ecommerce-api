const { pool } = require('../config/database');
const { createCancellationRequest } = require('./cancellation_request.controller.js');

// Función para crear una nueva orden
const createOrder = async (order) => {
  const { rows } = await pool.query(
    'INSERT INTO orders (user_id, total, status, shipping_address, shipping_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [order.user_id, order.total, order.status, order.shipping_address, order.shipping_status]
  );
  return rows[0];
};

// Función para insertar detalles de la orden
const insertOrderDetail = async (orderId, productId, quantity) => {
  await pool.query(
    'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
    [orderId, productId, quantity]
  );
};

// Función para obtener todas las órdenes
const getAllOrders = async () => {
  const { rows } = await pool.query('SELECT * FROM orders');
  return rows;
};

// Función para obtener una orden por ID
const getOrderById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return rows[0] || null;
};

// Función para obtener las órdenes de un usuario
const getOrdersByUser = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
  return rows;
};

// Función para actualizar una orden
const updateOrderById = async (id, order) => {
  const { rows } = await pool.query(
    'UPDATE orders SET total = $1, status = $2, shipping_address = $3, shipping_status = $4 WHERE id = $5 RETURNING *',
    [order.total, order.status, order.shipping_address, order.shipping_status, id]
  );
  return rows[0];
};

// Función para eliminar una orden por ID
const deleteOrderById = async (id) => {
  await pool.query('DELETE FROM orders WHERE id = $1', [id]);
};

// Función para cancelar una orden
const cancelOrderById = async (orderId) => {
  await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['cancelled', orderId]);
};

// Controlador para crear una nueva orden
const createOrderController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { total, shipping_address, status, shipping_status } = req.body;

    const newOrder = await createOrder({
      user_id: userId,
      total,
      status: status || 'pending',
      shipping_address,
      shipping_status: shipping_status || 'pending'
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_creating_order') });
  }
};

// Controlador para obtener todas las órdenes
const getOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_orders') });
  }
};

// Controlador para obtener una orden por ID
const getOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: req.t('order_not_found') });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_order') });
  }
};

// Controlador para obtener las órdenes de un usuario específico
const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_user_orders') });
  }
};

// Controlador para actualizar una orden por ID
const updateOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await updateOrderById(id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: req.t('order_not_found') });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_order') });
  }
};

// Controlador para eliminar una orden por ID
const deleteOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrderById(id);
    res.status(200).json({ message: req.t('order_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_order') });
  }
};

// Controlador para cancelar una orden
const requestCancelOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.userId;

    // Verificar si el usuario es el dueño de la orden o es administrador
    const order = await getOrderById(orderId);
    if (!order || (order.usuario_id !== userId && !req.user.is_admin)) {
      return res.status(403).json({ message: req.t('access_denied') });
    }

    // Si es un administrador, cancelar directamente
    if (req.user.is_admin) {
      await cancelOrderById(orderId);
      res.status(200).json({ message: req.t('order_canceled_successfully') });
    } else {
      // Si es el usuario, registrar una solicitud de cancelación
      await createCancellationRequest(orderId, userId, req.body.reason);
      res.status(200).json({ message: req.t('cancel_request_registered') });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_canceling_order') });
  }
};

module.exports = {
  // Funciones
  createOrder,
  insertOrderDetail,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderById,
  deleteOrderById,
  cancelOrderById,
  createCancellationRequest,

  // Controladores
  createOrderController,
  getOrdersController,
  getOrderController,
  getUserOrdersController,
  updateOrderController,
  deleteOrderController,
  requestCancelOrderController,
};