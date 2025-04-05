import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import BalanceModel from '../models/balance.model.js';

class UserController {
  async createUser(req, res) {
    try {
      if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: req.t('access_denied') });
      }
      const user = await UserModel.createUser(req.body);
      await BalanceModel.createInitialBalance(user.id);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: req.t('error_creating_user') });
    }
  }

  async getUsers(req, res) {
    try {
      if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: req.t('access_denied') });
      }

      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_users') });
    }
  }

  async getUser(req, res) {
    try {
      if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: req.t('access_denied') });
      }

      const id = req.params.id;
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: req.t('user_not_found') });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_user') });
    }
  }

  async updateUser(req, res) {
    try {
      if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: req.t('access_denied') });
      }

      const id = req.params.id;
      await UserModel.updateUser(id, req.body);
      res.status(200).json({ message: req.t('user_updated_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_user') });
    }
  }

  async deleteUser(req, res) {
    try {
      if (!req.user || !req.user.is_admin) {
        return res.status(401).json({ message: req.t('access_denied') });
      }

      const id = req.params.id;
      await UserModel.deleteUser(id);
      res.status(200).json({ message: req.t('user_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_user') });
    }
  }

  async getUserMe(req, res) {
    try {
      const user = req.user;
      res.json({
        id: user.userId,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_user_info') });
    }
  }
}

export default new UserController();