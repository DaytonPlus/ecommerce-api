const { 
  createUserController, 
  getUsersController, 
  getUserController, 
  updateUserController, 
  deleteUserController,
  getUserMeController
} = require('../src/controllers/user.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createUserController - should create a new user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.user = { is_admin: true };
    req.body = { name: 'Test User', email: 'test@example.com', password: 'password', is_admin: false };

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, ...req.body }] });

    await createUserController(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
  });

  test('getUsersController - should get all users', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.user = { is_admin: true };

    const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    pool.query.mockResolvedValueOnce({ rows: users });

    await getUsersController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  // Add more tests for other functions
});