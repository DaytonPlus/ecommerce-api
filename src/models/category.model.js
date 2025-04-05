import { pool } from '../config/database.js';

class CategoryModel {
  async getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
  }

  async getCategoryById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async createCategory(category) {
    const { rows } = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [category.name, category.description || null]
    );
    return rows[0];
  }

  async updateCategory(id, category) {
    const { rows } = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [category.name, category.description || null, id]
    );
    return rows[0];
  }

  async deleteCategoryById(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
}

export default new CategoryModel();