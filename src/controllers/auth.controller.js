const { pool } = require('../config/database');
const { createUserInDB, findUserByEmail } = require('../user.controller');

// Controlador para registro
const register = async (req, res) => {
  try {
    if (req.body.is_admin === true) {
      return res.status(403).json({ message: req.t('admin_registration_not_allowed') });
    }
    
    const user = await createUserInDB(req.body);
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: req.t('error_registering_user') });
  }
};

// Controlador para inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: req.t('invalid_credentials') });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('server_error') });
  }
};


module.exports = {
  // Funciones
  createUser,
  findUserByEmail,

  // Controladores
  register,
  login
};