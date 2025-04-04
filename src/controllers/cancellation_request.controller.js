const { pool } = require('../config/database');

// Función para crear una solicitud de cancelación
const createCancellationRequest = async (orderId, userId, reason) => {
  const { rows } = await pool.query(
    'INSERT INTO cancellation_requests (order_id, user_id, reason) VALUES ($1, $2, $3) RETURNING *',
    [orderId, userId, reason]
  );
  return rows[0];
};

// Función para obtener todas las solicitudes de cancelación
const getAllCancellationRequests = async () => {
  const { rows } = await pool.query('SELECT * FROM cancellation_requests');
  return rows;
};

// Función para obtener una solicitud de cancelación por ID
const getCancellationRequestById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM cancellation_requests WHERE id = $1', [id]);
  return rows[0] || null;
};

// Función para obtener las solicitudes de cancelación por UserID
const getAllCancellationRequestByUserId = async (id) => {
  const { rows } = await pool.query('SELECT * FROM cancellation_requests WHERE user_id = $1', [id]);
  return rows[0] || null;
};

// Función para actualizar el estado de una solicitud de cancelación
const updateCancellationRequestStatus = async (id, status) => {
  const { rows } = await pool.query(
    'UPDATE cancellation_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0];
};

// Controlador para crear una solicitud de cancelación
const createCancellationRequestController = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.userId;
    const reason = req.body.reason;

    if (!orderId || !reason) {
      return res.status(400).json({ message: req.t('invalid_data') });
    }

    const newRequest = await createCancellationRequest(orderId, userId, reason);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error_creating_cancellation_request') });
  }
};

// Controlador para obtener todas las solicitudes de cancelación
const getAllCancellationRequestsController = async (req, res) => {
  try {
    const requests = await getAllCancellationRequests();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error_fetching_cancellation_requests') });
  }
};

// Controlador para obtener una solicitud de cancelación por ID
const getCancellationRequestByIdController = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await getCancellationRequestById(requestId);
    if (!request) {
      return res.status(404).json({ message: req.t('cancellation_request_not_found') });
    }
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error_fetching_cancellation_request') });
  }
};

// Controlador para actualizar el estado de una solicitud de cancelación
const updateCancellationRequestStatusController = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const status = req.body.status;

    if (!requestId || !status) {
      return res.status(400).json({ message: req.t('invalid_data') });
    }

    const updatedRequest = await updateCancellationRequestStatus(requestId, status);
    if (!updatedRequest) {
      return res.status(404).json({ message: req.t('cancellation_request_not_found') });
    }
    res.json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.t('error_updating_cancellation_request_status') });
  }
};

// Controlador para obtener las solicitudes de cancelación del propio usuario
const getAllCancellationRequestsMeController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const requests = await getAllCancellationRequestByUserId(userId);
    res.json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t('error_fetching_cancellation_requests') });
  }
};

module.exports = {
  // Funciones
  createCancellationRequest,
  getAllCancellationRequests,
  getCancellationRequestById,
  updateCancellationRequestStatus,

  // Controladores
  createCancellationRequestController,
  getAllCancellationRequestsController,
  getCancellationRequestController,
  updateCancellationRequestStatusController,
  getAllCancellationRequestsMeController
};