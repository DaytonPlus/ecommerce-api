// const { getUserLang } = require('./user.controller');

// Controlador para cambiar el idioma almacenando el valor en una cookie para los usuarios individuales
const changeLanguageController = (req, res) => {
  const lang = req.query.lang;
  res.cookie('i18next', lang);
  res.redirect(req.get('Referrer') || '/');
};

module.exports = {
  changeLanguageController,
};