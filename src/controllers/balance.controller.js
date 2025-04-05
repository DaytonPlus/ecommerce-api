import BalanceModel from '../models/balance.model.js';

class BalanceController {
  async getBalanceMe(req, res) {
    try {
      const user = req.user;
      const balance = await BalanceModel.getBalanceByUserId(user.userId);
      res.json({ balance });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_fetching_balance') });
    }
  }

  async getBalance(req, res) {
    try {
      const userId = req.params.userId;
      const balance = await BalanceModel.getBalanceByUserId(userId);
      if (!balance) {
        return res.status(404).json({ message: req.t('balance_not_found') });
      }
      res.json(balance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_fetching_balance') });
    }
  }

  async updateBalance(req, res) {
    try {
      const userId = req.params.userId;
      const amount = req.body.amount;
      
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ message: req.t('invalid_amount') });
      }

      const updatedBalance = await BalanceModel.updateBalance(userId, amount);
      if (!updatedBalance) {
        return res.status(404).json({ message: req.t('balance_not_found') });
      }
      
      res.json(updatedBalance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_balance') });
    }
  }

  async createInitialBalance(req, res) {
    try {
      const { userId, initialBalance } = req.body;
      
      if (!userId || isNaN(initialBalance)) {
        return res.status(400).json({ message: req.t('invalid_data') });
      }

      const newBalance = await BalanceModel.createInitialBalance(userId, initialBalance || 0.00);
      res.status(201).json(newBalance);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_creating_balance_record') });
    }
  }

  async deleteBalance(req, res) {
    try {
      const userId = req.params.userId;
      
      await BalanceModel.deleteBalanceByUserId(userId);
      
      res.status(200).json({ message: req.t('balance_record_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_balance_record') });
    }
  }
}

export default new BalanceController();