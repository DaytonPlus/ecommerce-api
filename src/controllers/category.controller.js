const { pool } = require('../config/database');

// Función para obtener todas las categorías
const getAllCategories = async () => {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};

// Función para obtener una categoría por ID
const getCategoryById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0] || null;
};

// Función para crear una nueva categoría
const createCategoryInDB = async (category) => {
  const { rows } = await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [category.name, category.description || null]
  );
  return rows[0];
};

// Función para actualizar una categoría
const updateCategoryInDB = async (id, categoria) => {
  const { rows } = await pool.query(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [category.name, category.description || null, id]
  );
  return rows[0];
};

// Función para eliminar una categoría por ID
const deleteCategoryById = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};

// Controlador para obtener todas las categorías
const getCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_categories') });
  }
};

// Controlador para obtener una categoría por ID
const getCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: req.t('category_not_found') });
    }
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_category') });
  }
};

// Controlador para crear una nueva categoría
const createCategoryController = async (req, res) => {
  try {
    const newCategory = await createCategoryInDB(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_creating_category') });
  }
};

// Controlador para actualizar una categoría
const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = await updateCategoryInDB(id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ message: req.t('category_not_found') });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_category') });
  }
};

// Controlador para eliminar una categoría por ID
const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCategoryById(id);
    res.status(200).json({ message: req.t('category_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_category') });
  }
};

module.exports = {
  // Funciones
  getAllCategories,
  getCategoryById,
  createCategoryInDB,
  updateCategoryInDB,
  deleteCategoryById,

  // Controladores
  getCategoriesController,
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
};