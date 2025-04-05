import { pool } from '../config/database.js';

class OrderModel {
  async createOrder(order) {
    const { rows } = await pool.query(
      'INSERT INTO orders (user_id, total, status, shipping_address, shipping_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [order.user_id, order.total, order.status, order.shipping_address, order.shipping_status]
    );
    return rows[0];
  }

  async insertOrderDetail(orderId, productId, quantity) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
      [orderId, productId, quantity]
    );
  }

  async getAllOrders() {
    const { rows } = await pool.query('SELECT * FROM orders');
    return rows;
  }

  async getOrderById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async getOrdersByUser(userId) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return rows;
  }

  async updateOrderById(id, order) {
    const { rows } = await pool.query(
      'UPDATE orders SET total = $1, status = $2, shipping_address = $3, shipping_status = $4 WHERE id = $5 RETURNING *',
      [order.total, order.status, order.shipping_address, order.shipping_status, id]
    );
    return rows[0];
  }

  async deleteOrderById(id) {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
  }

  async cancelOrderById(orderId) {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['cancelled', orderId]);
  }
}

export default new OrderModel();