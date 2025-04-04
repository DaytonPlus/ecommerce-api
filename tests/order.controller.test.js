const {
  createOrderController,
  getOrdersController,
  getOrderController,
  getUserOrdersController,
  updateOrderController,
  deleteOrderController,
  requestCancelOrderController
} = require('../src/controllers/order.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createOrderController - should create a new order', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.user = { userId: 1 };
    req.body = { total: 100, shipping_address: '123 Main St', status: 'pending', shipping_status: 'pending' };

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, ...req.body }] });

    await createOrderController(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });

  test('getOrdersController - should get all orders', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const orders = [{ id: 1, total: 100 }, { id: 2, total: 200 }];
    pool.query.mockResolvedValueOnce({ rows: orders });

    await getOrdersController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(orders);
  });

  // Add more tests for other functions
});