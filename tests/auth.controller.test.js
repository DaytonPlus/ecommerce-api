const {
  register,
  login
} = require('../src/controllers/auth.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('register - should register a new user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = { email: 'test@example.com', password: 'password', is_admin: false };

    const newUser = { id: 1, ...req.body };
    pool.query.mockResolvedValueOnce({ rows: [newUser] });

    await register(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });

  test('login - should login a user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = { email: 'test@example.com', password: 'password' };

    const user = { id: 1, email: 'test@example.com', password: await bcrypt.hash('password', 10) };
    pool.query.mockResolvedValueOnce({ rows: [user] });

    await login(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });

  // Add more tests for other functions
});