const {
  getBalanceMeController,
  getBalanceController,
  updateBalanceController,
  createInitialBalanceController,
  deleteBalanceController
} = require('../src/controllers/balance.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('Balance Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getBalanceMeController - should get balance of the current user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.user = { userId: 1 };
    const balance = { balance: 100 };

    pool.query.mockResolvedValueOnce({ rows: [balance] });

    await getBalanceMeController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ balance });
  });

  test('getBalanceController - should get balance by user ID', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.params.userId = 1;
    const balance = { balance: 100 };

    pool.query.mockResolvedValueOnce({ rows: [balance] });

    await getBalanceController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(balance);
  });

  // Add more tests for other functions
});