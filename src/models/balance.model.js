import { pool } from '../config/database.js';

class BalanceModel {
  async getBalanceByUserId(userId) {
    const { rows } = await pool.query('SELECT * FROM balances WHERE user_id = $1', [userId]);
    return rows[0] || null;
  }

  async updateBalance(userId, amount) {
    const { rows } = await pool.query(
      'UPDATE balances SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING *',
      [amount, userId]
    );
    return rows[0];
  }

  async createInitialBalance(userId, initialBalance = 0.00) {
    // Verificar si ya existe un saldo para el usuario
    const existingBalance = await this.getBalanceByUserId(userId);
    
    // Si ya existe, no hacer nada y devolver el saldo existente
    if (existingBalance) {
      // Retorna el saldo existente
      return existingBalance;
    }
    
    // Si no existe, insertar un nuevo registro de saldo
    const { rows } = await pool.query(
      'INSERT INTO balances (user_id, balance) VALUES ($1, $2) RETURNING *',
      [userId, initialBalance]
    );
    return rows[0];
  }

  async deleteBalanceByUserId(userId) {
    await pool.query('DELETE FROM balances WHERE user_id = $1', [userId]);
  }
}

export default new BalanceModel();