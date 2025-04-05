import OrderModel from '../models/order.model.js';
import CancellationRequestModel from '../models/cancellation_request.model.js';

class OrderController {
  async createOrder(req, res) {
    try {
      const userId = req.user.userId;
      const { total, shipping_address, status, shipping_status } = req.body;

      const newOrder = await OrderModel.createOrder({
        user_id: userId,
        total,
        status: status || 'pending',
        shipping_address,
        shipping_status: shipping_status || 'pending'
      });

      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_creating_order') });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_orders') });
    }
  }

  async getOrder(req, res) {
    try {
      const id = req.params.id;
      const order = await OrderModel.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: req.t('order_not_found') });
      }
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_order') });
    }
  }

  async getUserOrders(req, res) {
    try {
      const userId = req.user.userId;
      const orders = await OrderModel.getOrdersByUser(userId);
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_user_orders') });
    }
  }

  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      const updatedOrder = await OrderModel.updateOrderById(id, req.body);
      if (!updatedOrder) {
        return res.status(404).json({ message: req.t('order_not_found') });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_order') });
    }
  }

  async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      await OrderModel.deleteOrderById(id);
      res.status(200).json({ message: req.t('order_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_order') });
    }
  }

  async requestCancelOrder(req, res) {
    try {
      const orderId = req.params.id;
      const userId = req.user.userId;
      const order = await OrderModel.getOrderById(orderId);
      if (!order || (order.user_id !== userId && !req.user.is_admin)) {
        return res.status(403).json({ message: req.t('access_denied') });
      }
      if (req.user.is_admin) {
        await OrderModel.cancelOrderById(orderId);
        res.status(200).json({ message: req.t('order_canceled_successfully') });
      } else {
        await CancellationRequestModel.createCancellationRequest(orderId, userId, req.body.reason);
        res.status(200).json({ message: req.t('cancel_request_registered') });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_canceling_order') });
    }
  }
}

export default new OrderController();