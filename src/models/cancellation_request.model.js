import { pool } from '../config/database.js';

class CancellationRequestModel {
  async createCancellationRequest(orderId, userId, reason) {
    const { rows } = await pool.query(
      'INSERT INTO cancellation_requests (order_id, user_id, reason) VALUES ($1, $2, $3) RETURNING *',
      [orderId, userId, reason]
    );
    return rows[0];
  }

  async getAllCancellationRequests() {
    const { rows } = await pool.query('SELECT * FROM cancellation_requests');
    return rows;
  }

  async getCancellationRequestById(id) {
    const { rows } = await pool.query('SELECT * FROM cancellation_requests WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async getAllCancellationRequestsByUserId(id) {
    const { rows } = await pool.query('SELECT * FROM cancellation_requests WHERE user_id = $1', [id]);
    return rows; 
  }

  async updateCancellationRequestStatus(id, status) {
    const { rows } = await pool.query(
      'UPDATE cancellation_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return rows[0];
  }
}

export default new CancellationRequestModel();