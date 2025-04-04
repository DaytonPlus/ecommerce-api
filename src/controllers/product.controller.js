const { pool } = require('../config/database');

// Función para obtener todos los productos
const getAllProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

// Función para obtener un producto por ID
const getProductById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0] || null;
};

// Función para crear un nuevo producto
const createProduct = async (product) => {
  const { rows } = await pool.query(
    'INSERT INTO productos (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [product.name, product.description, product.price, product.stock, product.category_id || null]
  );
  return rows[0];
};

// Función para actualizar un producto
const updateProductById = async (id, product) => {
  const { rows } = await pool.query(
    'UPDATE productos SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING *',
    [
      product.nombre,
      product.descripcion,
      product.precio,
      product.stock,
      product.category_id || null,
      id,
    ]
  );
  return rows[0];
};

// Función para eliminar un producto por ID
const deleteProductById = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

// Función para buscar productos con filtros
const searchProductsBy = async (filters) => {
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
};

// Controlador para obtener todos los productos
const getProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_products') });
  }
};

// Controlador para obtener un producto por ID
const getProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: req.t('product_not_found') });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_product') });
  }
};

// Controlador para crear un nuevo producto
const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_creating_product') });
  }
};

// Controlador para actualizar un producto
const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await updateProductById(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: req.t('product_not_found') });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_product') });
  }
};

// Controlador para eliminar un producto por ID
const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProductById(id);
    res.status(200).json({ message: req.t('product_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_product') });
  }
};

// Controlador para buscar productos con filtros
const searchProductsController = async (req, res) => {
  try {
    const filters = req.query; // Los filtros se envían como parámetros de consulta (query params)
    const products = await searchProductsBy(filters);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_searching_products') });
  }
};

module.exports = {
  // Funciones
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  searchProductsBy,
  
  // Controladores
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductsController,
};