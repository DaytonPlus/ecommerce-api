import CartModel from '../models/cart.model.js';
import OrderModel from '../models/order.model.js';
import BalanceModel from '../models/balance.model.js';
import { cartSchema } from '../schemas/cart.schema.js';

class CartController {
  async addItemToUserCart(req, res) {
    try {
      const userId = req.user.userId;
      const { productId, quantity } = req.body;

      const { error } = cartSchema.validate({ user_id: userId, product_id: productId, quantity });
      if (error) {
        const details = error.details.map((detail) => ({
          message: req.t(detail.message),
          path: detail.path.join('.')
        }));
        return res.status(400).json({ message: req.t('invalid_fields'), details });
      }

      await CartModel.addItemToCartDB(userId, productId, quantity);
      res.status(200).json({ message: req.t('item_added_to_cart') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_adding_item_to_cart') });
    }
  }

  async getUserCartItems(req, res) {
    try {
      const userId = req.user.userId;
      const items = await CartModel.getCartItemsDB(userId);
      res.json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_cart_items') });
    }
  }

  async removeItemFromUserCart(req, res) {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;

      await CartModel.removeItemFromCartDB(userId, productId);
      res.status(200).json({ message: req.t('item_removed_from_cart') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_removing_item_from_cart') });
    }
  }

  async deleteUserCart(req, res) {
    try {
      const userId = req.user.userId;

      await CartModel.deleteCartDB(userId);
      res.status(200).json({ message: req.t('cart_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_cart') });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await CartModel.getAllCarts();
      res.json(carts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_carts') });
    }
  }

  async getCart(req, res) {
    try {
      const cartId = req.params.id;
      const cart = await CartModel.getCartById(cartId);
      if (!cart) {
        return res.status(404).json({ message: req.t('cart_not_found') });
      }
      res.json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_cart') });
    }
  }

  async createCart(req, res) {
    try {
      const { userId, productId, quantity } = req.body;

      const { error } = cartSchema.validate({ user_id: userId, product_id: productId, quantity });
      if (error) {
        const details = error.details.map((detail) => ({
          message: req.t(detail.message),
          path: detail.path.join('.')
        }));
        return res.status(400).json({ message: req.t('invalid_fields'), details });
      }

      await CartModel.createCartDB(userId, productId, quantity);
      res.status(201).json({ message: req.t('cart_created_successfully') });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: req.t('error_creating_cart') });
    }
  }

  async updateCart(req, res) {
    try {
      const cartId = req.params.id;
      const { userId, productId, quantity } = req.body;

      const { error } = cartSchema.validate({ user_id: userId, product_id: productId, quantity });
      if (error) {
        const details = error.details.map((detail) => ({
          message: req.t(detail.message),
          path: detail.path.join('.')
        }));
        return res.status(400).json({ message: req.t('invalid_fields'), details });
      }

      await CartModel.updateCartDB(cartId, userId, productId, quantity);
      res.status(200).json({ message: req.t('cart_updated_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_cart') });
    }
  }

  async deleteCart(req, res) {
    try {
      const cartId = req.params.id;
      await CartModel.deleteCartById(cartId);
      res.status(200).json({ message: req.t('cart_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_cart') });
    }
  }

  async convertCartToOrder(req, res) {
    try {
      const userId = req.user.userId;
      const { shipping_address } = req.body;
      const cartItems = await CartModel.getCartItemsDB(userId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: req.t('cart_is_empty') });
      }
      const total = await CartModel.calculateCartPriceTotal(userId);
      const balance = await BalanceModel.getBalanceByUserId(userId);
      const newBalance = balance - total;
      if(newBalance < 0.0) {
        return res.status(400).json({ message: req.t('insufficient_balance', { balance, required: Math.abs(newBalance) }) });
      }
      await BalanceModel.updateBalance(userId, newBalance);
      const newOrder = await OrderModel.createOrderInDB({
        user_id: userId,
        total,
        status: 'pending',
        shipping_address,
        shipping_status: 'pending'
      });
      for (const item of cartItems) {
        await OrderModel.insertOrderDetail(newOrder.id, item.product_id, item.quantity);
      }
      await CartModel.deleteCartDB(userId);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_converting_cart_to_order') });
    }
  }
}

export default new CartController();