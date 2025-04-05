import { pool } from '../config/database.js';

class CartModel {
  async checkItemInCart(userId, productId) {
    const { rows } = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    return rows.length > 0;
  }

  async addItemToCartDB(userId, productId, quantity) {
    const existingItem = await this.checkItemInCart(userId, productId);

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
  }

  async getCartItemsDB(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );
    return rows;
  }

  async removeItemFromCartDB(userId, itemId) {
    await pool.query(
      'DELETE FROM carts WHERE user_id = $1 AND product_id = $2',
      [userId, itemId]
    );
  }

  async deleteCartDB(userId) {
    await pool.query('DELETE FROM carts WHERE user_id = $1', [userId]);
  }

  async getAllCarts() {
    const { rows } = await pool.query('SELECT * FROM carts');
    return rows;
  }

  async getCartById(cartId) {
    const { rows } = await pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    return rows[0] || null;
  }

  async createCartDB(userId, productId, quantity) {
    await pool.query(
      'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
  }

  async updateCartDB(cartId, userId, productId, quantity) {
    await pool.query(
      'UPDATE carts SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4',
      [userId, productId, quantity, cartId]
    );
  }

  async deleteCartById(cartId) {
    await pool.query('DELETE FROM carts WHERE id = $1', [cartId]);
  }

  async calculateCartPriceTotal(userId) {
    const items = await this.getCartItemsDB(userId);

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
  }
}

export default new CartModel();