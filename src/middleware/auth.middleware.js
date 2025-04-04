const jwt = require('jsonwebtoken');

const authMiddleware = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: req.t('no_token_provided') });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: req.t('invalid_token') });
  }
};

module.exports = { authMiddleware };