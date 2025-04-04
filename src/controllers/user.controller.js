const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { createInitialBalance } = require('./balance.controller.js');

// Función para crear un nuevo usuario
const createUserInDB = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
    [user.name, user.email, hashedPassword, user.is_admin]
  );
  
  const newUser = rows[0];
  
  // Crea el saldo inicial para el usuario recién creado
  await createInitialBalance(newUser.id);
  
  return newUser;
};

// Función para obtener un usuario por correo electrónico
const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] || null;
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

// Función para obtener un usuario específico
const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
};

// Función para actualizar un usuario
const updateUser = async (id, user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5',
    [user.name, user.email, hashedPassword, user.is_admin, id]
  );
};

// Función para eliminar un usuario
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

// Controlador para crear un nuevo usuario
const createUserController = async (req, res) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }

    const user = await createUserInDB(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: req.t('error_creating_user') });
  }
};

// Controlador para obtener todos los usuarios
const getUsersController = async (req, res) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }

    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_users') });
  }
};

// Controlador para obtener un usuario específico
const getUserController = async (req, res) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }

    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: req.t('user_not_found') });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_user') });
  }
};

// Controlador para actualizar un usuario
const updateUserController = async (req, res) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }

    const id = req.params.id;
    await updateUser(id, req.body);
    res.status(200).json({ message: req.t('user_updated_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_user') });
  }
};

// Controlador para eliminar un usuario
const deleteUserController = async (req, res) => {
  try {
    if (!req.user || !req.user.is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }

    const id = req.params.id;
    await deleteUser(id);
    res.status(200).json({ message: req.t('user_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_user') });
  }
};

// Controlador para obtener información del propio usuario
const getUserMeController = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user.userId,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_getting_user_info') });
  }
};

module.exports = {
  // Funciones
  createUserInDB,
  findUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,

  // Controladores
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUserMeController
};