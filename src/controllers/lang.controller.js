/**
 * Controlador para cambiar el idioma almacenando el valor en una cookie para los usuarios individuales.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const changeLanguageController = (req, res) => {
  try {
    const lang = req.query.lang;

    if (!lang) {
      return res.status(400).json({ message: 'El parámetro de idioma es obligatorio.' });
    }

    res.cookie('i18next', lang);
    res.redirect(req.get('Referrer') || '/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al cambiar el idioma.' });
  }
};

export { changeLanguageController };