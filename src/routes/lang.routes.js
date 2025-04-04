const express = require('express');
const { changeLanguageController } = require('../controllers/lang.controller');

const router = express.Router();

// Ruta para cambiar el idioma
router.get('/lang', changeLanguageController);

module.expots = router;