import { pool } from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { userSchema, loginSchema } from '../schemas/user.schema.js';

class AuthController {
  async register(req, res) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        const details = error.details.map((detail) => ({
          message: req.t(detail.message),
          path: detail.path.join('.')
        }));
        return res.status(400).json({ message: req.t('invalid_fields'), details });
      }

      if (req.body.is_admin) {
        return res.status(403).json({ message: req.t('admin_registration_not_allowed') });
      }

      const user = await UserModel.createUser(req.body);

      if (!user) {
        throw new Error(JSON.stringify(user));
      }

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
      const { error } = loginSchema.validate(req.body);
      if (error) {
        const details = error.details.map((detail) => ({
          message: req.t(detail.message),
          path: detail.path.join('.')
        }));
        return res.status(400).json({ message: req.t('invalid_fields'), details });
      }

      const user = await UserModel.findUserByEmail(req.body.email);
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
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