import { pool } from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';

class AuthController {
  async register(req, res) {
    try {
      if (req.body.is_admin === true) {
        return res.status(403).json({ message: req.t('admin_registration_not_allowed') });
      }
      const user = await UserModel.createUserInDB(req.body);
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_registering_user') });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: req.t('invalid_credentials') });
      }
      const token = jwt.sign(
        { userId: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('server_error') });
    }
  }
}

export default new AuthController();