const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = Router();

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesion
router.post('/login', login);

module.exports = router;