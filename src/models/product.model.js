import { pool } from '../config/database.js';

class ProductModel {
  async getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  }

  async getProductById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async createProduct(product) {
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [product.name, product.description, product.price, product.stock, product.category_id || null]
    );
    return rows[0];
  }

  async updateProductById(id, product) {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING *',
      [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.category_id || null,
        id,
      ]
    );
    return rows[0];
  }

  async deleteProductById(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }

  async searchProductsBy(filters) {
    const { name, description, price, stock, category_id } = filters;

    const query = `
      SELECT * FROM products 
      WHERE 
        ($1::text IS NULL OR name ILIKE '%' || $1 || '%') AND
        ($2::text IS NULL OR description ILIKE '%' || $2 || '%') AND
        ($3::numeric IS NULL OR price = $3) AND
        ($4::int IS NULL OR stock = $4) AND
        ($5::int IS NULL OR category_id = $5)
    `;

    const { rows } = await pool.query(query, [name || null, description || null, price || null, stock || null, category_id || null]);
    return rows;
  }
}

export default new ProductModel();