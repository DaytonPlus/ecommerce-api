import CancellationRequestModel from '../models/cancellation_request.model.js';

class CancellationRequestController {
  async createCancellationRequest(req, res) {
    try {
      const orderId = req.params.orderId;
      const userId = req.user.userId;
      const reason = req.body.reason;

      if (!orderId || !reason) {
        return res.status(400).json({ message: req.t('invalid_data') });
      }

      const newRequest = await CancellationRequestModel.createCancellationRequest(orderId, userId, reason);
      res.status(201).json(newRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: req.t('error_creating_cancellation_request') });
    }
  }

  async getAllCancellationRequests(req, res) {
    try {
      const requests = await CancellationRequestModel.getAllCancellationRequests();
      res.json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: req.t('error_fetching_cancellation_requests') });
    }
  }

  async getCancellationRequestById(req, res) {
    try {
      const requestId = req.params.requestId;
      const request = await CancellationRequestModel.getCancellationRequestById(requestId);
      if (!request) {
        return res.status(404).json({ message: req.t('cancellation_request_not_found') });
      }
      res.json(request);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: req.t('error_fetching_cancellation_request') });
    }
  }

  async updateCancellationRequestStatus(req, res) {
    try {
      const requestId = req.params.requestId;
      const status = req.body.status;

      if (!requestId || !status) {
        return res.status(400).json({ message: req.t('invalid_data') });
      }

      const updatedRequest = await CancellationRequestModel.updateCancellationRequestStatus(requestId, status);
      if (!updatedRequest) {
        return res.status(404).json({ message: req.t('cancellation_request_not_found') });
      }
      res.json(updatedRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: req.t('error_updating_cancellation_request_status') });
    }
  }

  async getAllCancellationRequestsMe(req, res) {
    try {
      const userId = req.user.userId;
      const requests = await CancellationRequestModel.getAllCancellationRequestsByUserId(userId);
      res.json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: req.t('error_fetching_cancellation_requests') });
    }
  }
}

export default new CancellationRequestController();