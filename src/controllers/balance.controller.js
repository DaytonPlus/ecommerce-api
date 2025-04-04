const { pool } = require('../config/database');

// Función para obtener el saldo de un usuario por ID
const getBalanceByUserId = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM balances WHERE user_id = $1', [userId]);
  return rows[0] || null;
};

// Función para actualizar el saldo de un usuario
const updateBalance = async (userId, amount) => {
  const { rows } = await pool.query(
    'UPDATE balances SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING *',
    [amount, userId]
  );
  return rows[0];
};

// Función para crear un registro de saldo inicial
const createInitialBalance = async (userId, initialBalance = 0.00) => {
  // Verificar si ya existe un saldo para el usuario
  const existingBalance = await getBalanceByUserId(userId);
  
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
};

// Función para eliminar el registro de saldo de un usuario
const deleteBalanceByUserId = async (userId) => {
  await pool.query('DELETE FROM balances WHERE user_id = $1', [userId]);
};

// Controlador para obtener el saldo del propio usuario
const getBalanceMeController = async (req, res) => {
  try {
    const user = req.user;
    const balance = await getBalanceByUserId(user.userId);
    res.json({ balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_fetching_balance') });
  }
};

// Controlador para obtener el saldo
const getBalanceController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const balance = await getBalanceByUserId(userId);
    if (!balance) {
      return res.status(404).json({ message: req.t('balance_not_found') });
    }
    res.json(balance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_fetching_balance') });
  }
};

// Controlador para actualizar el saldo
const updateBalanceController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const amount = req.body.amount;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: req.t('invalid_amount') });
    }

    const updatedBalance = await updateBalanceInDB(userId, amount);
    if (!updatedBalance) {
      return res.status(404).json({ message: req.t('balance_not_found') });
    }
    
    res.json(updatedBalance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_updating_balance') });
  }
};

// Controlador para crear un registro inicial de saldo
const createInitialBalanceController = async (req, res) => {
  try {
    const { userId, initialBalance } = req.body;
    
    if (!userId || isNaN(initialBalance)) {
      return res.status(400).json({ message: req.t('invalid_data') });
    }

    const newBalance = await createInitialBalanceInDB(userId, initialBalance || 0.00);
    res.status(201).json(newBalance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_creating_balance_record') });
  }
};

// Controlador para eliminar un registro de saldo
const deleteBalanceController = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    await deleteBalanceByUserId(userId);
    
    res.status(200).json({ message: req.t('balance_record_deleted_successfully') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_deleting_balance_record') });
  }
};

module.exports = {
  // Funciones
  getBalanceByUserId,
  updateBalance,
  createInitialBalance,
  deleteBalanceByUserId,
  
  // Controladores
  getBalanceMeController,
  getBalanceController,
  updateBalanceController,
  createInitialBalanceController,
  deleteBalanceController
};