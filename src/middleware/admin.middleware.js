import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

const adminMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: req.t('no_token_provided') });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const userId = req.user.userId;
  
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
    if (!rows[0] || !rows[0].is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_verifying_access') });
  }
};

export { adminMiddleware };