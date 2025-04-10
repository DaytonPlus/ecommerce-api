import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

class UserModel {
  async createUser(user) {
    if(!user.password || user.password === '') {
      return null;
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.name, user.email, hashedPassword, user.is_admin??false]
    );
    return rows[0];
  }

  async findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  }

  async getAllUsers() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  }

  async getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async updateUser(id, user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5',
      [user.name, user.email, hashedPassword, user.is_admin, id]
    );
  }

  async deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
  
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin
    };
  }
}

export default new UserModel();