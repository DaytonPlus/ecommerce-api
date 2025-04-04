const {
  createCancellationRequestController
} = require('../src/controllers/cancellation_request.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('Cancellation Request Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createCancellationRequestController - should create a cancellation request', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.user = { userId: 1 };
    req.body = { orderId: 1, reason: 'Change of mind' };

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, order_id: req.body.orderId, user_id: req.user.userId, reason: req.body.reason }] });

    await createCancellationRequestController(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, order_id: req.body.orderId, user_id: req.user.userId, reason: req.body.reason });
  });

  // Add more tests for other functions
});