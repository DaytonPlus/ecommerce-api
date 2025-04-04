const { pool } = require('../config/database');

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await pool.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
    if (!user.rows[0] || !user.rows[0].is_admin) {
      return res.status(401).json({ message: req.t('access_denied') });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_verifying_access') });
  }
};

module.exports = adminMiddleware;